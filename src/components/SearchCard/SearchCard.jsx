import React from 'react'
import { Link } from 'react-router-dom'

function SearchCard(props) {

  return (
    <Link to={`/allproducts/product/${props.id}`}><div className="grid grid-cols-[70px_1fr] place-items-center place-content-center border-b-2" onClick={()=>{props.setshowSearch(false);props.inpRef.value="";console.log(props.inputRef)}}>
        <img
          src={props.image}
          className="rounded-lg h-[70px] min-w-[70px] object-contain p-2 mx-auto"
          alt=""
        />
        <div>
          <div className="text-left p-2">
            <p className="text-slate-600  text-ellipsis  line-clamp-1">{props.name}</p>
            <p className=" text-slate-500 text-ellipsis w-[220px] h-[28px]  line-clamp-2">
              {props.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SearchCard