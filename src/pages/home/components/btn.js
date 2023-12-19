import  "../components/css/btn.css"
function btn({text,back_col,font_col,width,height}) {
  return (
    <button className="btn" style={{backgroundColor:back_col,color:font_col,width:width,height:"35px",padding: "5px"}}>{text}</button>
  )
}

export default btn