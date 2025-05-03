import type { CategoryGroup } from '@/types/Invoice';
import Category from '@/enums/Category';
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/types/supabase.database';
import { useAuth } from '@/providers/AuthProvider';
import IconSize from '@/svg/enums/IconSize';
import CartIcon from '@/svg/icons/CartIcon';
import FolderIcon from '@/svg/icons/FolderIcon';
import FoodIcon from '@/svg/icons/FoodIcon';
import HeartIcon from '@/svg/icons/HeartIcon';
import SmileyIcon from '@/svg/icons/SmileyIcon';
import TransportIcon from '@/svg/icons/TransportIcon';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeadlineText from '@/components/HeadlineText';
import { router } from 'expo-router';

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CategoryIcon: Record<Category, React.ReactNode> = {
  [Category.Food]: <FoodIcon size={IconSize.MD} color="white" />,
  [Category.Transport]: <TransportIcon size={IconSize.MD} color="white" />,
  [Category.Other]: <FolderIcon size={IconSize.MD} color="white" />,
  [Category.Health]: <HeartIcon size={IconSize.MD} color="white" />,
  [Category.Shopping]: <CartIcon size={IconSize.MD} color="white" />,
  [Category.Leisure]: <SmileyIcon size={IconSize.MD} color="white" />,
};

const CategoryColorMap: Record<Category, string> = {
  [Category.Food]: '#B9A009',
  [Category.Transport]: '#005CD4',
  [Category.Other]: '#666F76',
  [Category.Health]: '#D13241',
  [Category.Shopping]: '#0B6E4A',
  [Category.Leisure]: '#F4C4C9',
};

export default function DashboardPage() {
  const insets = useSafeAreaInsets();

  const { profile } = useAuth();

  const [invoices, setInvoices] = useState<Tables<'invoices'>[]>([]);

  useEffect(() => {
    if (!profile) {
      console.error(`[DashboardPage] No profile found`);

      supabase.auth.signOut();
      router.replace('/auth/sign-in');

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
        color: CategoryColorMap[category.name as Category],
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
                {CategoryIcon[category.type]}
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
