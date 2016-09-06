import React, { Component, PropTypes, } from 'react';
import { reduxForm, } from 'redux-form';

import Dropzone from 'react-dropzone';

const FILE_FIELD_NAME = 'files';

export const fields = [FILE_FIELD_NAME,];

class App extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  };

  onSubmit(data) {
    var body = new FormData();
    Object.keys(data).forEach(( key ) => {
      body.append(key, data[ key ]);
    });

    console.info('POST', body, data);
    console.info('This is expected to fail:');
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
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <div>
          <label>Files</label>
          <div>
            <Dropzone
              onDrop={ ( filesToUpload, e ) => files.onChange(filesToUpload)}
            >
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            { files && Array.isArray(files.value) && (
              <ul>
                { files.value.map((file, i) => <li key={i}>{file.name}</li>) }
              </ul>
            ) }
          </div>
        </div>
        <div>
          <button type="submit">
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

export default reduxForm({
  form: 'simple',
  fields,
})(App);
