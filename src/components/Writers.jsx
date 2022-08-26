const Writer = (props) => {
  return (
    <>
      {props.writer
        ?.filter((item) => item.job === "Writer")
        .map((item, index, arr) =>
          arr.length - 1 === index ? (
            <span key={index}> {item.name} </span>
          ) : (
            <span key={index}> {item.name}, </span>
          )
        )}
    </>
  );
};

export default Writer;
