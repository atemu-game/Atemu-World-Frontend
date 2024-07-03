import {
  useStyleConfig,
  Card as ChakraCard,
  CardProps,
} from '@chakra-ui/react';

// type CardProps = BoxProps & {
//   variant?: string | object;
// };

export default function Card(props: CardProps) {
  const { variant, children, ...rest } = props;

  const styles = useStyleConfig('CardBox', { variant });
  return (
    <ChakraCard
      height="fit-content"
      {...rest}
      __css={styles}
      style={{
        boxShadow: `0px 4px 16px 0px #E8B77C26 inset, 
       0px -4px 16px 0px #E8B77C26 inset, 
       4px 0px 16px 0px #E8B77C13 inset, 
       -4px 0px 16px 0px #E8B77C13 inset`,
        border: '2px solid',
        borderImageSlice: 2,
        borderImageSource:
          'linear-gradient(90.73deg, rgba(232, 183, 124, 0.075) -5.34%, rgba(253, 217, 105, 0.075) 51.67%, rgba(178, 113, 34, 0.075) 116.05%)',
      }}
    >
      {props.children}
    </ChakraCard>
  );
}
