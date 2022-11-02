import { useState } from "react";
import { Link } from 'react-router-dom'

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import useMarvelService from "../../services/MarvelServices";
import Error from "../error/Error";

import './charForm.scss';

const CharForm = () => {

    const [char, setChar] = useState(null)
    const { loading, error, clearError, getCharByName } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharByName(name)
            .then(onCharLoaded);
    }

    const errorMessage = error ? <div className="char__search-critical-error"><Error /></div> : null;
    const content = !char ? null : char.length > 0 ?
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div> :
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={({ charName }) => {
                    updateChar(charName)
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name="charName"
                            type="text"
                            placeholder="Enter name" />
                        <button
                            type="submit"
                            className="button button__main"
                            disabled={loading}
                        >
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    <ErrorMessage
                        component="div"
                        className="char__search-error"
                        name="charName"
                    />
                </Form>
            </Formik>
            {content}
            {errorMessage}
        </div>
    )
}

export default CharForm; 