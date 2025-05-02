import { forwardRef } from 'react';
import { Pressable, View, type TextStyle, type ViewStyle } from 'react-native';
import BodyText from '@/components/BodyText';

const borderWidth = 1 as const;

type ButtonProps = {
  text: string;

  color?: string;
  borderColor?: string;
  textColor?: string;

  disabled?: boolean;

  onPress?: () => void;

  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;

  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button = forwardRef<View, ButtonProps>(function Button(
  {
    text,
    color = '#5AA4FE',
    borderColor = color,
    textColor = 'white',
    onPress = () => console.log('Button pressed'),
    leftNode,
    rightNode,
    style,
  },
  ref,
) {
  return (
    <Pressable
      ref={ref}
      style={[
        {
          backgroundColor: color,
          width: '100%',
          height: 55 + borderWidth,
          borderRadius: 100,

          borderWidth,
          borderColor,
        },
        style,
      ]}
      onPress={onPress}
    >
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flex: 1 }}>{leftNode}</View>

        <View style={{ flex: 5 }}>
          <BodyText
            style={{
              color: textColor,
              fontSize: 18,
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            {text}
          </BodyText>
        </View>

        <View style={{ flex: 1 }}>{rightNode}</View>
      </View>
    </Pressable>
  );
});

Button.displayName = 'Button';

export default Button;
