import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "../ShowItems/ShowItems";

const HomeComponents = () => {
  const folders = [
    { name: "New folder" },
    { name: "new folder 2" },
    { name: "new folder 2" },
  ];
  const files = [{ name: "New file" }, { name: "new file 2" }];

  const { isLoading, userFolders } = useSelector(
    (state) => ({
      isLoading: state.filefolder?.isLoading,
      userFolders: state.filefolder?.userFolders,
    }),
    shallowEqual
  );

  console.log(isLoading);

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading...</h1>
      ) : (
        <>
          <ShowItems
            title={"created Folders"}
            type={"folder"}
            items={userFolders}
          />

          <ShowItems title={"created Files"} type={"file"} items={files} />
        </>
      )}
    </div>
  );
};

export default HomeComponents;
