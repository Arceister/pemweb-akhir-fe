import '../Styles/index.css'

const Aboutweb = () => {
    const tokenTest = () => {
        console.log(localStorage.getItem('token'))
    }
    return (
        <div className = "header">
            <h2>Lorem Ipsum</h2>
            <button onClick={tokenTest}>Click</button>
        </div>
    )
}

export default Aboutweb