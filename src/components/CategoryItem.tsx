import Category from '@/enums/Category';
import IconSize from '@/svg/enums/IconSize';
import CaretIcon from '@/svg/icons/CaretIcon';
import BodyText from '@/components/BodyText';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { CategoryGroup } from '@/types/Invoice';
import CategoryIconMap from '@/constants/CategoryIconMap';
import Fonts from '@/constants/Fonts';

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CategoryColorMap: Record<Category, string> = {
  [Category.Food]: '#B9A009',
  [Category.Transport]: '#005CD4',
  [Category.Other]: '#666F76',
  [Category.Health]: '#D13241',
  [Category.Shopping]: '#0B6E4A',
  [Category.Leisure]: '#F4C4C9',
};

export default function CategoryItem({ name, items }: CategoryGroup) {
  const [isOpen, setIsOpen] = useState(false);

  const color = CategoryColorMap[name] || '#005CD4';

  return (
    <View>
      <Pressable
        style={styles.container}
        onPress={() => setIsOpen((current) => !current)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            flex: 1,
          }}
        >
          <View style={[styles.icon, { backgroundColor: color }]}>
            {CategoryIconMap[name as Category]}
          </View>

          <BodyText
            style={{
              color: '#D0D5DD',
              fontFamily: Fonts.Inter700,
              fontSize: 16,
              flex: 1,
            }}
          >
            {capitalizeFirstLetter(name)}
          </BodyText>
        </View>

        <View
          style={{
            padding: 6,
            borderRadius: '50%',
            backgroundColor: '#343B42',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CaretIcon
            size={IconSize.MD}
            color="#D0D5DD"
            rotate={isOpen ? 90 : 0}
          />
        </View>
      </Pressable>

      {isOpen && (
        <View
          style={{
            paddingHorizontal: 36,
            gap: 8,
            paddingTop: 8,
            paddingBottom: 16,
          }}
        >
          {items.map((item, index) => (
            <View style={styles.item} key={index}>
              <View style={{ flex: 1 }}>
                <BodyText style={styles.itemText}>
                  {capitalizeFirstLetter(item.title || '')}
                </BodyText>
              </View>

              <View
                style={{
                  width: 30,
                  alignItems: 'flex-end',
                }}
              >
                <BodyText style={styles.itemText}>
                  {item.quantity}
                  {item.unit_type}
                </BodyText>
              </View>

              <View
                style={{
                  width: 60,
                  alignItems: 'flex-end',
                }}
              >
                <BodyText style={styles.itemText}>{item.total_price}€</BodyText>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    paddingVertical: 8,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  icon: {
    padding: 12,
    borderRadius: '50%',
  },

  item: {
    backgroundColor: '#343B42',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,

    borderRadius: 8,

    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    color: '#D0D5DD',
    fontFamily: Fonts.Inter700,
  },
});
