const Directors = (props) => {
    return (
        <>
             {props.directors?.filter((item) => item.job === "Director")
                  .map((item, index) => (
                    <span key={index}> {item.name} </span>
                  ))}
        </>
    )
}

export default Directors;