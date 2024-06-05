import ItemCard from "./ItemCard"
import { useSelector } from "react-redux"
import { selectProduct } from "../../redux/selectors/productSelector"
import HomePageCard from "./HomePageCard"

export default function HomeSlide(props) {

  const products = useSelector(selectProduct)

  return (
    <div className="flex m-20 flex-col my-5 mx-4 gap-x-2.5 h-4/5">
        <h1 className="underline-offset-4 text-5xl font-medium"> {props.name} </h1>
        <div className="flex overflow-x-scroll">
            {products.map((item, index) => {
                if(props.category === item.category){
                    return <HomePageCard key={index} id={item.id} image={props.image} title={item.title} price={item.price} discount_price={item.discount_price}/>
                }
            })}
        </div>
        <hr />
    </div>
  )
}


// {data_product.map((item, index) => {
//     return props.category === item.category ? (
//         <ItemCard key={index} id={item.id} name={item.name} />
//     ) : null;
// })}

// height 90% ???

