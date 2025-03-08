import axios from "axios";
import { useEffect, useState } from "react"

function ImageShow()
{
    const [product,changeproduct]=useState([]);
    const [imgprod,changeimg]=useState([]);

    useEffect(()=>
    {
        const fetch=async (params) => {
            const response=await axios.get("http://localhost:8080/imgdata");
            changeproduct(response.data);
        }
        fetch();
    },[])

    useEffect(()=>
    {
        const fetchimg=async () => {
            const updatedproduct=await Promise.all(
                product.map(async (pro) => {
                    try {
                        const response = await axios.get(`http://localhost:8080/img/${pro.id}`,
                        {
                            responseType: "blob", 
                        });
                        const imageUrl = URL.createObjectURL(response.data);
                        return { ...pro, imageUrl };
                    } catch (error) {
                        console.log(error);
                    }
                    return { ...product, imageUrl: "placeholder-image-url" };
                })
            )
            changeimg(updatedproduct);
        }
        if(product.length>0)
        {
            fetchimg();
        }
    },[product])

    const tags=imgprod.map((item)=><><img src={item.imageUrl} alt={item.description} /></>)
    
    return(
        <>{tags}</>
    )
}

export default ImageShow