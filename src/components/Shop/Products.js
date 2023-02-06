import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_DATA = [
  {
    id:1,
    title:'Product 1',
    price:5,
    description:'Description of Product 1'
  },
  {
    id:2,
    title:'Product 2',
    price:10,
    description:'Product 2 Description'
  }  
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_DATA.map(item=>(

          <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          />

        ))}
        
      </ul>
    </section>
  );
};

export default Products;
