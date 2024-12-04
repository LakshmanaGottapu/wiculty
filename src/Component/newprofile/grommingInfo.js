
import React from 'react';
import groomingInfo from '../profile/groomingInfo';








class personalinfo extends React.Component{
    render(){
        return(
        <div class="bg-white my-5 p-4 gro-scope">
			<div class="row">
				<div class="col-12 col-sm-6">
					<div class="d-flex align-items-center">
						<div class="svg-groom mb-2 mr-2">
							<span>
								<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="briefcase" class="svg-inline--fa fa-briefcase fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"/>
									<path fill="currentColor" d="M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z"/>						
							</span>
						</div>
						<div>
							<h3 class="py-sm-4 font-weight-bold">Grooming Scope</h3>
						</div>
					</div>
				</div>
				<div class="col-12 col-sm-6 py-3 d-flex justify-content-end">
					<div class="svg-edit2" onclick="groominginputsfun()" id="groominginputsedit">
						<span class="fcr" title="Edit Details">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
								</path>
							</svg>
						</span>
					</div>
					<div class="fca fwn education-info-edit error-disable svg-tick d-none" id="tick-svg1">
						<span class="save-icon error-disable" title="Save All Education Details">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
								</path>
							</svg>
						</span>
					</div>
					<div class="svg-X ml-3 d-none" onclick="groominginputsX()" id="X-svg1">
						<span role="button" tabindex="0" title="Cancel Details">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z">	
								</path>
							</svg>
						</span>
					</div>
				</div>
			</div>
			<div class="row border-top py-3">
				<div class="col-12 col-sm-4">
					<h5 class="font-weight-bold">Basics</h5>
					<p class="text-muted">Your profile is the outline of your face as it is seen when someone is looking at you .</p>
				</div>
				<div class="col-12 col-sm-8">
					<div class="d-block" id="groomingoutputs">
						<div class="row py-sm-2">
							<div class="col-12 col-sm-6 py-2 py-sm-0">
								<h6>Types of jobs you are interested in</h6>
								<h6 class="text-muted">Development</h6>
							</div>
							<div class="col-12 col-sm-6 py-2 py-sm-0">
								<h6>Employment types looking for</h6>
								<h6 class="text-muted">IT</h6>
							</div>
						</div>
						<div class="row py-sm-2">
							<div class="col-12 col-sm-6 py-2 py-sm-0">
								<h6>Current Location</h6>
								<h6 class="text-muted">Bangalore</h6>
							</div>
							<div class="col-12 col-sm-6 py-2 py-sm-0">
								<h6>Current Country</h6>
								<h6 class="text-muted">India</h6>
							</div>
						</div>
						<div class="row py-sm-2">
							<div class="col-12 col-sm-6 py-2 py-sm-0">
								<h6>Preferred Location</h6>
								<h6 class="text-muted">Bangalore</h6>
							</div>
							<div class="col-12 col-sm-6 py-2 py-sm-0">
								<h6>Preferred Country</h6>
								<h6 class="text-muted">India</h6>
							</div>
						</div>
						<div class="row py-sm-2">
							<div class="col-12 col-sm-6 py-2 py-sm-0">
								<h6>Current/Last drawn CTC</h6>
								<h6 class="text-muted">3</h6>
							</div>
							<div class="col-12 col-sm-6 py-2 py-sm-0">
								<h6>Relocate</h6>
								<h6 class="text-muted">No</h6>
							</div>
						</div>
					</div>
					<div class="d-none" id="groominginputs">
						<div class="py-2">
							<label for="Types-of-jobs"/>Types of jobs you are interested in
							<input id="Types-of-jobs" placeholder="Types of jobs" type="text" class="form-control py-4"/>
						</div>
						<div class="py-2">
							<label for="Current-Location"/>/Current Location
							<input id="Current-Location" placeholder="Current Location" type="text" class="form-control py-4"/>
						</div>
						<div class="py-2">
							<label for="Preferred-Location"/>Preferred Location
							<input id="Preferred-Location" placeholder="Preferred Location" type="text" class="form-control py-4"/>
						</div>
						<div class="py-2">
							<label for="CTC"/>Current/Last drawn CTC
							<input id="CTC" placeholder="CTC" type="text" class="form-control py-4"/>
						</div>
						<div class="py-2">
							<label for="Employment-types"/>Employment types looking for
							<input id="Employment-types" placeholder="Employment types" type="text" class="form-control py-4"/>
						</div>
						<div class="row">
							<div class="col-12 col-sm-6">
								<div class="py-2">
									<label for="Employment-types"/>Current Country
									<select name="cars" id="cars" class="py-2 px-4 form-control"/>
										<option>+91 India</option>
										<option>+1 US (CDT)</option>
										<option>+1 US (MDT)</option>
										<option>+1 US (VCT)</option>
										<option>+19 Canada (CDT)</option>
										<option>+47 Australia (CDT)</option>	
								</div>
							</div>
							<div class="col-12 col-sm-6">
								<div class="py-2">
									<label for="Employment-types"/>Preferred Country
									<select name="cars" id="cars" class="py-2 px-4 form-control"/>
										<option>India</option>
										<option>USA</option>
										<option>Canada</option>
										<option>Australia</option>
										<option>Londown</option>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-12 col-sm-6">
								<div class="py-2">
									<label for="Employment-types"/>Relocate
									<select name="cars" id="cars" class="py-2 px-4 form-control"/>
									   	<option>Yes</option>
									   	<option>No</option>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        )
}
}
export default groomingInfo;
