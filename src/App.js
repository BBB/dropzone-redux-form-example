import React, { Component, PropTypes, } from 'react';
import { reduxForm, } from 'redux-form';

import Dropzone from 'react-dropzone';

const FILE_FIELD_NAME = 'files';

export const fields = [FILE_FIELD_NAME,];

@reduxForm({
  form: 'simple',
  fields,
})
export default class SimpleForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  };

  handleSubmit(data) {
    var body = new FormData();
    Object.keys(data).forEach(( key ) => {
      body.append(key, data[ key ]);
    });

    fetch(`http://example.com/send/`, {
      method: 'POST',
      body: body,
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  render() {
    const {
      fields,
      handleSubmit,
      resetForm,
    } = this.props;
    const files = fields[FILE_FIELD_NAME];
    return (
      <form onSubmit={ handleSubmit }>
        <div>
          <label>Files</label>
          <div>
            <Dropzone
              { ...files }
              onDrop={ ( filesToUpload, e ) => files.onChange(filesToUpload) }
            >
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
        </div>
        <div>
          <button
            onClick={ handleSubmit(::this.handleSubmit) }
          >
            Submit
          </button>
          <button
            onClick={ resetForm }
          >
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}
