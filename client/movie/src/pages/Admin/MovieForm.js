import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import Button from "../../components/button"
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import moment from "moment";

function MovieForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType,
}) {
    if (selectedMovie) {
        selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
            "YYYY-MM-DD"
        );
    }

    const dispatch = useDispatch();

    const languages = ["English", "Tamil", "Kannada", "Telugu", "Malayalam", "Hindi"].sort()
    
   
    console.log(languages);
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
            <Form layout="vertical" initialValues={selectedMovie}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Movie Name" name="title">
                            <input type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Movie Description" name="description">
                            <textarea type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Duration (Min)" name="duration">
                            <input type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Language" name="language">
                            <select name="" id="">
                                <option disabled selected>Select Language</option>
                                {languages.map(value => {
                                    return <option value={value}>{value}</option>
                                })}
                            </select>
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Release Date" name="releaseDate">
                            <input type="date" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Genre" name="genre">
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
                        <Form.Item label="Poster URL" name="poster">
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
                    <Button title="Save" type="submit" />
                </div>
            </Form>
        </Modal>
    );
}

export default MovieForm;