import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder ,faFile } from "@fortawesome/free-solid-svg-icons";
import "./ShowItems.css"

const ShowItems = ({ title, items ,type}) => {
  return (
    <div className="w-100">
      <h4 className="text-center border-bottom">{title}</h4>
      <div className="row gap-2 p-4  flex-wrap">
        
         { items && items.map((item, index) => {
            return (
              <p key={index * 55} className="col-md-2 py-3 text-center d-flext flex-column border">


              {type === "folder" ?(
               
               <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3"/>
               ):(

               <FontAwesomeIcon icon={faFile} size="3x" className="mb-3"/>
               )}
                {item?.name}
              </p>
            );
          })}
       
      </div>
    </div>
  );
};

export default ShowItems;
