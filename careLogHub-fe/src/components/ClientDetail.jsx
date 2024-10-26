const ClientDetail = ({clients}) =>{

    return(
        <div>
            <span>Full Name: {clients.firstName} {clients.lastName}</span>
            <button>Delete</button>
            <button>Edit</button>

        </div>
    )

}

export default ClientDetail