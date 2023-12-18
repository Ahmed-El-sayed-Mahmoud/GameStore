import Btn from "./btn"
function banner({header,title,btn_text,btn_exist,img}) {
  return (
    <div className="offer">
        <div className="container">
            <div className="img">
              <img src={img}/>
            </div>
            <div className="text">
                <h2>{header}</h2>
                <p className="norm">{title}</p>
                {btn_exist&&<Btn text={btn_text}/>}
            </div>
        </div>
    </div>
  )
}

export default banner