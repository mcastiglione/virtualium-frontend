import React, { useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import httpClient from '../../utils/axios';
import style from './company.css';
import { useHistory } from 'react-router';

const Form = ({ open }) => {
    const [formDatas, setFromDatas] = React.useState({
        id: '',
        name: '',
        description: '',
    })
    const history = useHistory();
    const [file, setFile] = React.useState("");
    const [fileName, setFileName] = React.useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState("");

    const Edit = ({
        children,
    }) => {
        return (
            <div className="card">
                <form style={{ textAlign: 'center' }}>
                    <h5 style={{ color: '#000' }}>Logo1</h5>
                    {children}
                </form>
            </div>
        );
    }

    const ImgUpload = ({
        onChange,
        src,
    }) => {
        return (
            <label className="custom-file-upload fas">
                <div className="img-wrap img-upload" >
                    <img src={src} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                </div>
                <input id="logo1" type="file" onChange={onChange} style={{ display: 'none' }} />
            </label>
        );
    }

    const photoUpload = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setFileName(file.name)
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const [file1, setFile1] = React.useState("");
    const [fileName1, setFileName1] = React.useState("");
    const [imagePreviewUrl1, setImagePreviewUrl1] = React.useState("");

    const Edit1 = ({
        children,
    }) => {
        return (
            <div className="card">
                <form style={{ textAlign: 'center' }}>
                    <h5 style={{ color: '#000' }}>Logo2</h5>
                    {children}
                </form>
            </div>
        );
    }

    const ImgUpload1 = ({
        onChange,
        src,
    }) => {
        return (
            <label className="custom-file-upload fas">
                <div className="img-wrap img-upload" >
                    <img src={src} style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                </div>
                <input id="logo2" type="file" onChange={onChange} style={{ display: 'none' }} />
            </label>
        );
    }

    const photoUpload1 = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setFile1(file);
            setFileName1(file.name)
            setImagePreviewUrl1(reader.result);
        }
        reader.readAsDataURL(file);
    }
    
    const handleFileUpload = async () => {
        var form = new FormData();
        form.append("files", file);
        form.append("files", file1);
        const { data } = await httpClient.apiCompanyPost('/upload_logo', form);
        console.log('imgupload--->', data)
    }

    const handleSubmit = async () => {
        console.log('handleSubmit--->', formDatas)
        handleFileUpload();
        var form = new FormData();
        form.append("brand_name", formDatas.name);
        form.append("brand_description", formDatas.description);
        form.append("logo1", fileName);
        form.append("logo2", fileName1);
        const { data } = await httpClient.apiCompanyPost(`/brand/${formDatas.id}`, form);
        console.log('handleSubmit--->', data)
        history.push('/')
    }

    const handleChangeFormData = (name, event) => {
        setFromDatas({ ...formDatas, [name]: event.target.value });
    }

    return (
        <div className={style.contentCompany} >
            <TextField label="Brand ID" style={{ width: '100%' }} onChange={(e) => { handleChangeFormData('id', e) }} />
            <TextField label="Brand Name" style={{ width: '100%' }} onChange={(e) => { handleChangeFormData('name', e) }} />
            <TextField label="Brand Description" style={{ width: '100%' }} onChange={(e) => { handleChangeFormData('description', e) }} />
            <Edit>
                <ImgUpload onChange={(e) => photoUpload(e)} src={imagePreviewUrl !== "" ? imagePreviewUrl : "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"} />
            </Edit>

            <Edit1>
                <ImgUpload1 onChange={(e) => photoUpload1(e)} src={imagePreviewUrl1 !== "" ? imagePreviewUrl1 : "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"} />
            </Edit1>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default Form;