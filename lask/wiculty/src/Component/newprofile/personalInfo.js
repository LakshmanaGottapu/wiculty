import React, { Component } from 'react';

class personalInfo extends Component {
  render () {
    return (
      <div className="bg-white my-5 p-4 pro-inputs">
        <div className="row">
          <div className="col-12 col-sm-6">
            <h3 className="py-sm-4 font-weight-bold">Professional Inputs</h3>
          </div>
          <div className="col-12 col-sm-6 py-3 d-flex justify-content-end">
            <div className="svg-edit1" onClick="professionalinputsfun()" id="professionalinputsedit">
              <span className="fcr" title="Edit Details">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" className="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" />
                <path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z" />
              </span>
            </div>
            <div className="fca fwn education-info-edit error-disable svg-tick d-none" id="tick-svg">
              <span className="save-icon error-disable" title="Save All Education Details">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" />
                <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
              </span>
            </div>
            <div className="svg-X ml-3 d-none" onClick="professionalinputsX()" id="X-svg">
              <span role="button" title="Cancel Details">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" className="svg-inline--fa fa-times-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" />
                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
              </span>
            </div>
          </div>
        </div>
        <div className="row border-top py-3">
          <div className="col-12 col-sm-4">
            <h5 className="font-weight-bold">Basics</h5>
            <p className="text-muted">Your profile is the outline of your face as it is seen when someone is looking at you .</p>
          </div>
          <div className="col-12 col-sm-8">
            <div className="d-block" id="professionaloutputs">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <label>Company Name</label>
                     <p className="text-muted">Wiculty</p>
            </div>
             <div className="col-12 col-sm-6">
                <label>Current Job Role</label>
                  <p className="text-muted">Programming</p>
                 </div>
            </div>
						<div className="row">
							<div className="col-12 col-sm-6">
								<label>Current Industry</label>
								<p className="text-muted">Development</p>
							</div>
							<div className="col-12 col-sm-6">
								<label>Resume link</label>
								<p className="text-muted">No resume found</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<label>Skils</label>
								<p className="text-muted">HTML,CSS,JAVASCRIPT</p>
							</div>
						</div>
					</div>
					<div className="d-none" id="professionalinputs">
						<div className="py-2">
							<label for="Company-name" /> Company Name
							<input id="Company-name" placeholder="Company name" type="text" class="form-control py-4"/>
						</div>
						<div className="py-2">
							<label for="Current-Industry"/>Current Industry
							<input id="Current-Industry" placeholder="Current Industry" type="text" class="form-control py-4"/>
						</div>
						<div className="py-2">
							<label for="Skills"/>Skills
							<input id="Skills" placeholder="Add a tag" type="text" class="form-control py-4"/>
							<p className="pt-3">Note: Type your skills and press &nbsp;<code>Enter</code>&nbsp; or &nbsp;<code>Tab</code></p>
						</div>
						<div className="py-2">
							<label for="Current-Job-Role"/>Current Job Role
							<input id="Current-Job-Role" placeholder="Current Role" type="text" class="form-control py-4"/>
						</div>
						<div className="py-2">
							<label for="resume" class="upload-resume c-p"/>
								<p>Upload Resume</p>
								<input id="resume" type="file" name="resume" accept=".pdf,.doc,.docx"/>
							<span className="file-types text-muted d-block">( Accepted formats PDF, DOC &amp; DOCX )</span>
						</div>
					</div>
				</div>
			</div>
        </div>
        )
    }
}
export default personalInfo;