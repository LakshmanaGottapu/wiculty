import React from 'react';


class profileinfo extends React.Component {
    render(){
        return(
<div class="container">
		<div class="bg-white my-5 p-4 personal-details">
			<div class="row">
				<div class="col-12 col-sm-6">
					<h3 class="py-sm-4 font-weight-bold">Personal Details</h3>
				</div>
				<div class="col-12 col-sm-6 py-3 d-flex justify-content-end">
					<div class="svg-edit5" onclick="personaldetailsfunfun()" id="personaldetailsinputsedit">
						<span class="fcr" title="Edit Details">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16 cur-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"/>
								<path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/>
						</span>
					</div>
					<div class="fca fwn education-info-edit error-disable svg-tick d-none" id="tick-svg4">
						<span class="save-icon error-disable" title="Save All Education Details">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"/>
								<path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/>				
						</span>
					</div>
					<div class="svg-X ml-3 d-none" onclick="personaldetailsX()" id="X-svg4">
						<span role="button" tabindex="0" title="Cancel Details">
							<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"/>
								<path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/>
						</span>
					</div>
				</div>
			</div>
			<div class="row border-top py-3">
				<div class="col-12 col-sm-4">
					<h5 class="font-weight-bold">Basics</h5>
					<p class="text-muted">Your profile is the outline of your face as it is seen when someone is looking at you.</p>
				</div>
				<div class="col-12 col-sm-8">
					<div class="row">
						<div class="col-12 col-sm-4">
							<div class="py-2 py-sm-0">
								<label class="d-flex justify-content-center m-0" for="profile-pic"/><img class="rounded-circle w-50" src="https://holmesbuilders.com/wp-content/uploads/2016/12/male-profile-image-placeholder-300x300.png"/>
								<input id="profile-pic" type="file" accept="image/*" style="display: none;"/>
							</div>
						</div>
						<div class="col-12 col-sm-8">
							<div class="" id="personaldetails">
								<div class="row">
									<div class="col-12 col-sm-6">
										<label>Full Name</label>
										<p class="text-muted">Wiculty</p>
									</div>
									<div class="col-12 col-sm-6">
										<label>Mobile Number</label>
										<p class="text-muted">9988776655</p>
									</div>
								</div>
								<div class="row">
									<div class="col-12 col-sm-6">
										<label>E-Mail</label>
										<p class="text-muted">wiculty@gmail.com</p>
									</div>
									<div class="col-12 col-sm-6">
										<label>Job Type</label>
										<p class="text-muted">Dev</p>
									</div>
								</div>
							</div>
							<div class="d-none" id="personalinputs">
								<div class="py-2">
									<label for="fullname"/>Full Name
									<input id="fullname" placeholder="Enter Your Name" type="text" class="form-control py-4"/>
								</div>
								<div class="py-2">
									<label for="email"/>E-Mail
									<input id="email" placeholder="wiculty@gmail.com" type="text" class="form-control py-4"/>
								</div>
								<div class="py-2">
									<label for="mobilenumber">Mobile Number</label>
									<input id="mobilenumber" placeholder="Number" type="text" class="form-control py-4"/>
								</div>
								<div class="py-2">
									<label for="job">Job Type</label>
									<input id="job" placeholder="Job Type" type="text" class="form-control py-4"/>
								</div>
								<div class="py-2">
									<label for="salary"/>Salary
									<input id="salary" placeholder="Salary" type="text" class="form-control py-4"/>
								</div>
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
export default profileinfo;