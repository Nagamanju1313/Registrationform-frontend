import { useState } from 'react';
import './register.css';

const Register = () => {
    const [formValues, setFormValues]=useState({
        firstName:"",
        middleName:"",
        lastName:"",
        course:{
            default:["Course", "BCA", "BBA", "B.Tech", "MSc", "MBA", "MCA", "M.Tech"],
            selected:""
        },
        gender:"",
        phone:{
            countryCode:"+91",
            number:""
        },
        address:"",
        email:"",
        password:"",
        rePassword:""
    });

    const [errMsg, setErrMsg] = useState({})

    const handleChange= (e)=>{
        let formValueTemp = formValues;

        switch(e.target.name){
            case "course":
                formValueTemp.course.selected = e.target.value;
                break;
            case "countryCode":
                formValueTemp.phone.countryCode = e.target.value;
                break;
            case "number":
                formValueTemp.phone.number = e.target.value;
                break;
            case "gender":
                formValueTemp.gender = e.target.value;
                break;
            default:
                formValueTemp[e.target.name] = e.target.value;
        }
        let finalValues = Object.assign({}, formValues,formValueTemp);
        console.log(e.target.value)
        setFormValues(finalValues)
        // setFormValues({...finalValues, ...formValueTemp})
    }

    const formSubmit = (e)=>{
        e.preventDefault();
        let errObj = {};
        
        if(formValues.firstName == ""){
            errObj.firstNameErr = "First Name is required"
        }

        if(formValues.middleName == ""){
            errObj.middleNameErr = "Middle Name is required"
        }

        if(formValues.lastName == ""){
            errObj.lastNameErr = "Last Name is required"
        }

        if(formValues.course.selected == ""){
            errObj.courseErr = "Course is required"
        }

        if(formValues.gender == ""){
            errObj.genderErr = "Gender is required"
        }

        if(formValues.phone.countryCode == ""){
            errObj.phoneCountryErr = "Countrycode is required"
        }

        if(formValues.phone.number == ""){
            errObj.phoneErr = "Number is required"
        }

        if(formValues.address == ""){
            errObj.addressErr = "Address is required"
        }

        if(formValues.email == ""){
            errObj.emailErr = "Email is required"
        }

        if(formValues.password == ""){
            errObj.passErr = "Password is required"
        }

        if(formValues.rePassword == ""){
            errObj.rePassErr = "Re Enter Password"
        }
        if(Object.values(errObj).length !== 0){
            setErrMsg({...formValues, ...errObj})
        }else{
            
        }

        const API_URL = "http://localhost:3000/formresponses"
        const sendData =  async ()=>{
            await fetch(API_URL, {
                method:"POST",
                mode: 'no-cors',
                cache: "no-cache",
                credentials: "same-origin",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Connection': 'keep-alive',
                    'Accept': '*/*',
                },
                body:JSON.stringify(formValues)
            })
            }
            sendData()  
        console.log(formValues)
        setTimeout(()=>{
            setErrMsg({})
        },3000)
    }
    return (
        <div className='register-main'>
            <div className='register-wrapper'>

                <form onSubmit={(e)=>formSubmit(e)}>
                    <h1>Registration Form</h1>
                    <label> Firstname </label>
                    <input type="text" name="firstName" value={formValues.firstName} onChange={(e)=>handleChange(e)}/>
                    {
                        errMsg.firstNameErr &&
                        <p>{errMsg.firstNameErr}</p>
                    }
                    <label> Middlename: </label>
                    <input type="text" name="middleName" value={formValues.middleName} onChange={(e)=>handleChange(e)}/>
                    {
                        errMsg.middleNameErr &&
                        <p>{errMsg.middleNameErr}</p>
                    }

                    <label> Lastname: </label>
                    <input type="text" name="lastName"  value={formValues.lastName} onChange={(e)=>handleChange(e)}/>
                    {
                        errMsg.lastNameErr &&
                        <p>{errMsg.lastNameErr}</p>
                    }

                    <label>
                        Course :
                    </label>
                    <select name="course" onChange={(e)=>handleChange(e)}>
                        {
                            formValues.course.default.map((courseItem)=>{
                                return <option value={courseItem}>{courseItem}</option>
                            })
                        }
                    </select>
                    {
                        errMsg.courseErr &&
                        <p>{errMsg.courseErr}</p>
                    }
                    <br/>
                    <label>
                        Gender :
                    </label>
                    <input type="radio" name="gender" value="Male" onChange={(e)=>handleChange(e)} checked={formValues.gender == 'Male'}/> Male
                    <input type="radio" name="gender" value="Female" onChange={(e)=>handleChange(e)} checked={formValues.gender == 'Female'}/> Female
                    <input type="radio" name="gender" value="Other" onChange={(e)=>handleChange(e)} checked={formValues.gender == 'Other'}/> Other
                    <br/>
                    {
                        errMsg.genderErr &&
                        <p><br/>{errMsg.genderErr}</p>
                    }

                    <br/>
                    <label>
                        Phone :
                    </label>
                    <div className='phoneCol'>
                        <input type="text" name="countryCode" value={formValues.phone.countryCode} onChange={(e)=>handleChange(e)}/>
                        <input type="text" name="number" size="10" value={formValues.phone.number} onChange={(e)=>handleChange(e)}/>
                    </div>
                    {
                        errMsg.phoneCountryErr &&
                        <p>{errMsg.phoneCountryErr}</p>
                    }
                    {
                        errMsg.phoneErr &&
                        <p>{errMsg.phoneErr}</p>
                    }
                    <label>
                        Address :
                    </label>

                    <textarea cols="80" rows="5" name="address" value={formValues.address} onChange={(e)=>handleChange(e)}>
                    </textarea>
                    {
                        errMsg.addressErr &&
                        <p>{errMsg.addressErr}</p>
                    }
                    <label>
                        Email :
                    </label>
                    <input type="email" id="email" name="email" value={formValues.email} onChange={(e)=>handleChange(e)}/>
                    {
                        errMsg.emailErr &&
                        <p>{errMsg.emailErr}</p>
                    }
                    <label>
                        Password :
                    </label>
                    <input type="Password" id="pass" name="password" value={formValues.password} onChange={(e)=>handleChange(e)}/>
                    {
                        errMsg.passErr &&
                        <p>{errMsg.passErr}</p>
                    }
                    <label>
                        Re-type password:
                    </label>
                    <input type="Password" id="repass" name="rePassword" value={formValues.rePassword} onChange={(e)=>handleChange(e)}/>
                    {
                        errMsg.rePassErr &&
                        <p>{errMsg.rePassErr}</p>
                    }
                    <input type="button" value="Submit" onClick={(e)=>{formSubmit(e)}}/>
                </form>
            </div>
        </div>
    )
}
export default Register;