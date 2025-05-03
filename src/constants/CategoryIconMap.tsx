import Category from '@/enums/Category';
import IconSize from '@/svg/enums/IconSize';
import FoodIcon from '@/svg/icons/FoodIcon';
import TransportIcon from '@/svg/icons/TransportIcon';
import FolderIcon from '@/svg/icons/FolderIcon';
import HeartIcon from '@/svg/icons/HeartIcon';
import CartIcon from '@/svg/icons/CartIcon';
import SmileyIcon from '@/svg/icons/SmileyIcon';

const CategoryIconMap: Record<Category, React.ReactNode> = {
  [Category.Food]: <FoodIcon size={IconSize.MD} color="white" />,
  [Category.Transport]: <TransportIcon size={IconSize.MD} color="white" />,
  [Category.Other]: <FolderIcon size={IconSize.MD} color="white" />,
  [Category.Health]: <HeartIcon size={IconSize.MD} color="white" />,
  [Category.Shopping]: <CartIcon size={IconSize.MD} color="white" />,
  [Category.Leisure]: <SmileyIcon size={IconSize.MD} color="white" />,
};

export default CategoryIconMap;
