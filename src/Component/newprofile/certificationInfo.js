import React from 'react';
import CertificationInfo from '../profile/certificationInfo';


class CertificationInfo extends React.Component{
    render(){
        return(
<div class="row border-top py-3 cert-details">
				<div class="col-12 col-sm-4">
					<h5 class="font-weight-bold">Certification Details (Optional)</h5>
					<div class="d-flex align-items-center">
						<div class="">
							<button type="button" class="btn btn-primary my-3">Add Details</button>
						</div>
						<div class="ml-5">
							<div class="col-12 d-flex justify-content-end p-0">
								<div class="svg-edit4" onclick="certificationinputsfun()" id="certificationinputsedit">
									<span class="fcr" title="Edit Details">
										<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16 cur-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
											<path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
											</path>
										</svg>
									</span>
								</div>
							</div>
							<div class="col-12 d-flex justify-content-end">
								<div class="svg-tick d-none" id="tick-svg3">
									<span class="save-icon error-disable" title="Save All Education Details">
										<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
											<path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
											</path>
										</svg>
									</span>
								</div>
								<div class="svg-X ml-3 d-none" onclick="certificationinputsX()" id="X-svg3">
									<span role="button" tabindex="0" title="Cancel Details">
										<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
											<path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z">	
											</path>
										</svg>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-sm-8">
					<div class="d-block" id="educationDegreeDisplay2">
						<div class="row">
							<div class="col-12 col-sm-6">
								<h6>Course/Certification</h6>
								<h6 class="text-muted">Javascript</h6>
							</div>
							<div class="col-12 col-sm-6">
								<h6>Institue Name</h6>
								<h6 class="text-muted">GG</h6>
							</div>
						</div>
						<p class="py-2 m-0 mt-2">Time Period</p>
						<div class="row">
							<div class="col-12 col-sm-6">
								<h6>From</h6>
							</div>
							<div class="col-12 col-sm-6 d-none d-sm-block">
								<h6>To</h6>
							</div>
						</div>
						<div class="row">
							<div class="col-12 col-sm-6">
								<div class="row text-muted">
									<div class="col-12 col-sm-6">
										<p>Feb</p>
									</div>
									<div class="col-12 col-sm-6">
										<p>1999</p>
									</div>
								</div>
							</div>
							<div class="col-12 col-sm-6">
								<div class="row">
									<div class="d-block d-sm-none pl-3">
										<h6>To</h6>
									</div>
									<div class="col-12 col-sm-6 text-muted">
										<p>July</p>
									</div>
									<div class="col-12 col-sm-6 text-muted">
										<p>2003</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="d-none" id="educationDegreeEdit2">
						<div class="row py-4">
							
							<div class="col-12 col-sm-6">
								<div>
									<label for="Degree"/>Course/Certification
									<input id="Degree" placeholder="Enter Your Course" type="text" class="form-control py-4"/>
									<small class="text-danger">*Enter course</small>
								</div>
							</div>
							<div class="col-12 col-sm-6">
								<div class="pt-2 pt-sm-0">
									<label for="Institue-Name"/>Institue Name
									<input id="Institue-Name" placeholder="Enter Your Institute Name" type="text" class="form-control py-4"/>
									<small class="text-danger">*Enter institute name</small>
								</div>
							</div>
						</div>
						<p class="mb-2">Time Period</p>
						<div class="row">
							<div class="col-12 col-sm-6">
								<p>From</p>
							</div>
							<div class="col-12 col-sm-6 d-none d-sm-block">
								<p>To</p>
							</div>
						</div>
						<div class="row">
							<div class="col-12 col-sm-6">
								<div class="row">
									<div class="col-12 col-sm-6">
										<div>
											<select name="cars" id="cars" class="py-2 px-3 form-control">
										  		<option>---Month---</option>
											    <option>January</option>
											    <option>February</option>
											    <option>March</option>
											    <option>April</option>
											    <option>May</option>
											    <option>June</option>
											    <option>July</option>
											    <option>August</option>
											    <option>September</option>
											    <option>October</option>
											    <option>November</option>
											    <option>December</option>
										  	</select>
										</div>
									</div>
									<div class="col-12 col-sm-6">
										<div class="mt-3 mt-sm-0">
											<select name="cars" id="cars" class="py-2 px-3 form-control">
												<option>---Year---</option>	
											    <option>1991</option>
											    <option>1992</option>
											    <option>1993</option>
											    <option>1994</option>
											    <option>1995</option>
											    <option>1996</option>
											    <option>1997</option>
											    <option>1998</option>
											    <option>1999</option>
											    <option>2000</option>
											    <option>2001</option>
											    <option>2002</option>
										  	</select>
										</div>
									</div>
								</div>
							</div>
							<div class="d-block d-sm-none pl-3 pt-4">
								<p>To</p>
							</div>
							<div class="col-12 col-sm-6">
								<div class="row">
									<div class="col-12 col-sm-6">
										<div>
											<select name="cars" id="cars" class="py-2 px-3 form-control">
											  	<option>---Month---</option>
												<option>January</option>
												<option>February</option>
												<option>March</option>
											    <option>April</option>
											    <option>May</option>
											    <option>June</option>
											    <option>July</option>
											    <option>August</option>
											    <option>September</option>
											    <option>October</option>
											    <option>November</option>
											    <option>December</option>
											</select>
										</div>
									</div>
									<div class="col-12 col-sm-6">
										<div class="mt-3 mt-sm-0">
											<select name="cars" id="cars" class="py-2 px-3 form-control">
												<option>---Year---</option>
											    <option>1991</option>
												<option>1992</option>
											    <option>1993</option>
											    <option>1994</option>
											    <option>1995</option>
											    <option>1996</option>
											    <option>1997</option>
											    <option>1998</option>
											    <option>1999</option>
											    <option>2000</option>
											    <option>2001</option>
											    <option>2002</option>
											</select>
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
export default CertificationInfo;