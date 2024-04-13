import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import MovieForm from "./MovieForm";
import moment from "moment";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";

import { deleteMovies, getMovies } from "../../apis";
import ConfirmationModal from "../../components/ConfirmationModal";


function MovieList() {
    const [movies, setMovies] = useState([]);
    const [showMovieFormModal, setShowMovieFormModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add");
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false)
    const [deleteMovieState, setMovieState] = useState(null) 
    const getMoviesapi = async () => {
        try {
            dispatch(showLoading())
            const response = await getMovies()
            if (response.success) {
                setMovies(response.data)
            }
            else {
                message.error(response.message)
            }
            dispatch(hideLoading())
        }
        catch (err) {
            message.error(err)
        }
    }

    const deleteMovieAPI = async (value) => {
        try {
            dispatch(showLoading())
            const response = await deleteMovies(value)
            getMoviesapi()// calling the get movies api to refresh the list
            dispatch(hideLoading())
            if (response.success) {
                message.success(response.message)
            }
            else {
                message.error(response.message)
            }

        }
        catch (err) {
            message.error(err)
        }
    }
    const handleOk = () => {
        deleteMovieAPI(deleteMovieState)
        setOpen(false)
    }
    //defining our columns of our table using the antdesign template
    const columns = [
        {
            title: "Poster",
            dataIndex: "poster",
            render: (text, record) => {
                return (
                    <img
                        src={record.poster_URL}
                        alt="poster"
                        height="60"
                        width="80"
                        className="br-1"
                    />
                );
            },
        },
        {
            title: "Name",
            dataIndex: "title",
        },

        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Duration (in Mins)",
            dataIndex: "duration",
        },
        {
            title: "Genre",
            dataIndex: "gener",
        },
        {
            title: "Language",
            dataIndex: "language",
        },
        {
            title: "Release Date",
            dataIndex: "release_date",
            render: (text, record) => {
                return moment(record.release_date).format("DD-MM-YYYY");
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div className="flex gap-1">
                        <i
                            className="ri-delete-bin-2-line" style={{ cursor: "pointer" }}
                            onClick={() => {
                                setOpen(true)
                                // deleteMovieAPI(record)
                                setMovieState(record)
                            }}
                        ></i>
                        <i
                            className="ri-edit-2-line" style={{ cursor: "pointer"}}
                            onClick={() => {
                                setSelectedMovie(record);
                                setFormType("edit");
                                setShowMovieFormModal(true);
                            }}
                        ></i>
                    </div>
                );
            },
        },
    ];
    useEffect(() => {
        getMoviesapi()
        // eslint-disable-next-line
    }, [])
    
    return (
        <div>
            <div className="flex justify-end mb-1">
                <Button
                    title="Add Movie"
                    variant="outlined"
                    onClick={() => {
                        setShowMovieFormModal(true);
                        setFormType("add");
                    }}
                />
            </div>

            <Table columns={columns} dataSource={movies} />

            {showMovieFormModal && (
                <MovieForm
                    showMovieFormModal={showMovieFormModal}
                    setShowMovieFormModal={setShowMovieFormModal}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    formType={formType}
                    getMoviesapi = {getMoviesapi}
                />
            )}
    
            {open&& <ConfirmationModal handleOk={handleOk} open={open} setOpen={setOpen}/>}
        </div>
    );
}

export default MovieList;