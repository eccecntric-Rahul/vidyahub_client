
const SmallCard=({course})=>{
    return <>
        <div className="container-fluid p-1">
            <div className="row">
                <div className="col-md-6 offset-3">
                    <h5>{course.name}</h5>
                    <p>From: {course.classFrom}</p>
                    <p>To: {course.classTo}</p>
                </div>
            </div>
        </div>
    </>
}

export default SmallCard;