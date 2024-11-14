import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState([]);
    const [search, setSearch] = useState('');
    const [description, setDescription] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState([])
    const debouncedSearch = useDebounce(search, 1000);
    
    const navigate = useNavigate();

    const {user, setUser, auth, logoutUser} = useContext(AuthContext)

    

    useEffect(() => {
        if(debouncedSearch){
            handleSearch(debouncedSearch)
        }else{
            setSuggestions([])
        }
    }, [debouncedSearch])

    const fetchProjects = async () => {
        try{
           const res = await axios.get('http://localhost:3000/projects', {
            headers: {'token': auth}
           });
           console.log(res)
           setProjects(res.data)
        }catch(err){
            // console.error(err)
            setError(err.response.data.error)
            setTimeout(() => {
                logoutUser();
                navigate('/login')
            }, 2500)

        }
    }

    const handleSearchChange = async (e) => {{
        const value = e.target.value;
        setSearch(value);
    }}

    const fetchSuggestion = () => {

    }

    const handleSuggestionClick = (suggestions) => {
        setSearch(suggestions);
        handleSearch(suggestions);
    }

    const handleSearch = async (searchTerm) => {
        console.log(searchTerm)
        try{
            const res = await axios.get('http://localhost:3000/projects/search', {
                params:{
                    name: searchTerm
                }
            });
            setProjects(res.data);
            setSuggestions([]);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProjects();
    }, [])


    const handleAddProject = async (e) => {
        e.preventDefault();
        const newProject = {
            name,
            description,
            owner:{
                userId: user._id,
                username: user.username,
            }
        }
        try{
            // fetch
            await axios.post('http://localhost:3000/projects', newProject)
            setName('');
            setDescription('');
        }catch(err){
            console.error(err)
        }
    }
  return (
    <div>
        <h1>Projects</h1>
        {error && <h2>{error}</h2>}
        <form onSubmit={handleAddProject}>
        <input type="text" placeholder='project name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder='project description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type='submit'>Add project</button>
        </form>

        <form >
            <input type="text" placeholder='search by name' value={search} onChange={handleSearchChange} />
            <button type='submit' >Search</button>
            {
                suggestions.length > 0 && (
                    <ul>
                        {
                            suggestions.map((suggestions) => (
                                <li key={suggestions._id} onClick={() => handleSuggestionClick(suggestions.name)}>{suggestions.name} </li>
                            ))
                        }
                    </ul>
                )
            }
        </form>

        <ul>
            {
                projects.map(project => (
                    <li key={project}>
                        <Link to={`/taskview/${project._id}`}>{project.name}</Link>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export {Home}