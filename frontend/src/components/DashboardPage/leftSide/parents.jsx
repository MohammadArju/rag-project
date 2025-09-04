import LeftBottom from "./leftBottom";

const Parent = ({ documents, sendDataToParent }) => {
  return (
    <div>
      {documents.map((doc) => (
        <LeftBottom 
          key={doc.id} 
          document={doc} 
          sendDataToParent={sendDataToParent} // 👈 pass karna hoga
        />
      ))}
    </div>
  );
};

export default Parent;
