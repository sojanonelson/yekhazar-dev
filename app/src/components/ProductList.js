// ProductList.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

const ProductList = ({ products}) => {
  console.log("productList: ", products)

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <ProductItem
          key={product._id} 
          name={product.name}
          brand={product.brand.name}
          price={product.price}
          imageUrl={product.imageUrl}
          id={product._id}
          info={product}
          slug={product.slug}

          
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin:10
  },
});

export default ProductList;
