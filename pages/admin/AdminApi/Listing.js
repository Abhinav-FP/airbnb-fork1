import { Component } from 'react'
import Api from './../../LaravelApi/Api';
class Listing extends Component {
    async adminlogin(data) {
        return Api.post("/admin/login",data);
    }
    
    async addproperty(data) {
        return Api.post("/admin/add-property",data);
    }
    render() {
        return (
            <div >
                <></>
            </div>
        )
    }
}

export default Listing;