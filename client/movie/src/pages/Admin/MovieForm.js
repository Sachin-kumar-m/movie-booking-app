import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import Button from "../../components/button"
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import moment from "moment";
import { addMovies, updateMovies } from "../../apis";

function MovieForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType,
    getMoviesapi
}) {
    if (selectedMovie) {
        selectedMovie.release_date = moment(selectedMovie.release_date).format(
            "YYYY-MM-DD"
        );
    }

    const dispatch = useDispatch();
    const languages = ["English", "Tamil", "Kannada", "Telugu", "Malayalam", "Hindi"].sort()



    const handleSave = async (movie) => {
        try {

            if (formType === "add"){
                dispatch(showLoading)
                const response = await addMovies(movie)
                if (response.success) {
                    message.success(response.message)
                    setShowMovieFormModal(false)
                    getMoviesapi()
                }
                else {
                    message.error(response.message)
                }
                dispatch(hideLoading())
            }
            else {
                dispatch(showLoading())
                const response = await updateMovies({...movie,_id:selectedMovie._id,})
                if (response.success) {
                    message.success(response.message)
                    setShowMovieFormModal(false)
                    getMoviesapi()
                    dispatch(hideLoading())
                }
                else {
                    message.error(response.message)
                }
                dispatch(hideLoading())
            }

        }
        catch (err) {
            message.error(err)
            console.log(err)
        }

    }
    return (
        <Modal
            title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
            open={showMovieFormModal}
            onCancel={() => {
                setShowMovieFormModal(false);
                setSelectedMovie(null);
            }}
            footer={null}
            width={800}
        >
            <Form layout="vertical" initialValues={selectedMovie} onFinish={handleSave}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Movie Name" name="title" rules={[{ required: true, message: "Movie Name cannot be empty" }]} >
                            <input type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Movie Description" name="description" rules={[{ required: true, message: "Description cannot be empty" }]}>
                            <textarea type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Duration (Min)" name="duration" rules={[{ required: true, message: "Duration cannot be empty" }]}>
                            <input type="Number" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Language" name="language" rules={[{ required: true, message: "Please select Language" }]}>
                            <select name="" id="">
                                <option disabled selected>Select Language</option>
                                {languages.map(value => {
                                    return <option value={value}>{value}</option>
                                })}
                            </select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Release Date" name="release_date" rules={[{ required: true, message: "Please select Release Date" }]}>
                            <input type="date" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Genre" name="gener" rules={[{ required: true, message: "Please Select Genre" }]}>
                            <select name="" id="">
                                <option value="" disabled selected>Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Romance">Romance</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Poster URL" name="poster_URL">
                            <input type="text" />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-end gap-1">
                    <Button
                        title="Cancel"
                        variant="outlined"
                        type="button"
                        onClick={() => {
                            setShowMovieFormModal(false);
                            setSelectedMovie(null);
                        }}
                    />
                    {formType === "add" ? <Button title="Save" type="submit" /> : <Button title="Update" type="submit" />}
                </div>
            </Form>
        </Modal>
    );
}

export default MovieForm;