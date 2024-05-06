import React from 'react'
import { Link } from 'react-router-dom'

function SearchCard(props) {

  return (
    <Link to={`/allproducts/product/${props.id}`}><div className="flex border-b-2 items-center justify-center" onClick={()=>{props.setshowSearch(false);props.inpRef.value=""}}>
        <img
          src={props.image}
          className="rounded-lg h-[70px] min-w-[70px] object-contain p-2 mx-auto"
          alt=""
        />
        <div>
          <div className="text-left p-2">
            <p className="text-slate-600  text-ellipsis  line-clamp-1">{props.name}</p>
            <p className=" text-slate-500 text-ellipsis w-[260px] h-[28px]  line-clamp-2">
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SearchCard