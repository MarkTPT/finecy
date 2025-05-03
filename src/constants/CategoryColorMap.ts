import Category from '@/enums/Category';

const CategoryColorMap: Record<Category, string> = {
  [Category.Food]: '#FF8902',
  [Category.Transport]: '#005CD4',
  [Category.Other]: '#666F76',
  [Category.Health]: '#D13241',
  [Category.Shopping]: '#0B6E4A',
  [Category.Leisure]: '#FE580C',
};

export default CategoryColorMap;
