import type { CategoryGroup } from '@/types/Invoice';
import Category from '@/enums/Category';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/types/supabase.database';
import { useAuth } from '@/providers/AuthProvider';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeadlineText from '@/components/HeadlineText';
import { router } from 'expo-router';
import CategoryIconMap from '@/constants/CategoryIconMap';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import CategoryColorMap from '@/constants/CategoryColorMap';

export default function DashboardPage() {
  const insets = useSafeAreaInsets();

  const { profile } = useAuth();

  const [invoices, setInvoices] = useState<Tables<'invoices'>[]>([]);

  useEffect(() => {
    if (!profile) {
      console.error(`[DashboardPage] No profile found`);

      supabase.auth.signOut().then(() => {
        router.replace('/auth/sign-in');
      });

      return;
    }

    supabase
      .from('invoices')
      .select('*')
      .eq('user_id', profile.id)
      .then((response) => {
        if (response.error) {
          console.error(`Error fetching invoices: ${response.error}`);
        } else {
          setInvoices(response.data);
        }
      });
  }, [profile]);

  const formattedCategories = useMemo(() => {
    const merged = invoices.reduce((acc, invoice) => {
      (invoice.categories as CategoryGroup[]).forEach((category) => {
        const existingCategory = acc.find((cat) => cat.name === category.name);

        if (existingCategory) {
          existingCategory.items.push(...category.items);
        } else {
          acc.push(category);
        }
      });

      return acc;
    }, [] as CategoryGroup[]);

    const formatted = merged.map((category) => {
      const total = category.items.reduce((acc, item) => {
        return acc + (item.total_price || 0);
      }, 0);

      return {
        ...category,
        total,
        color:
          CategoryColorMap[category.name as Category] ||
          CategoryColorMap[Category.Other],
        name: capitalizeFirstLetter(category.name),
        type: category.name,
      };
    });

    return formatted;
  }, [invoices]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingTop: insets.top,

        flex: 1,
      }}
    >
      <View style={{ padding: 20 }}>
        <HeadlineText>Dashboard</HeadlineText>
      </View>

      <View
        style={{
          flex: 1,
          padding: 25,
          marginVertical: 20,
        }}
      >
        {formattedCategories.map((category) => (
          <Fragment key={category.name}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: category.color,
                  padding: 12,
                  borderRadius: '50%',
                }}
              >
                {CategoryIconMap[category.type]}
              </View>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 12,
                }}
              >
                {category.name}
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 'auto',
                }}
              >
                {formattedCategories
                  .find((cat) => cat.name === category.name)
                  ?.total.toFixed(2)}
                €
              </Text>
            </View>
          </Fragment>
        ))}
      </View>
    </View>
  );
}
