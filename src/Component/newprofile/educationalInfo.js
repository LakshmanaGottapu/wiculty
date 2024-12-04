import React from 'react';
import EducationalInfo from '../profile/educationalInfo';


class EducationalInfo extends React.Component{
    render(){
        return(
<div class="bg-white my-5 p-4">
			<div class="d-flex align-items-center">
				<div class="svg-other mb-2 mr-2">
					<span class="fcr"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" class="svg-inline--fa fa-graduation-cap fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"/><path fill="currentColor" d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"/> </span>
				</div>
				<div>
					<h3 class="py-4 font-weight-bold">Other Details</h3>
				</div>
			</div>
			<div class="row border-top pt-3 pb-5 edu-details">
				<div class="col-12 col-sm-4">
					<div class="d-flex align-items-center">
						<div class="svg-edu mb-2 mr-2">
							<span class="fcr"/><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" class="svg-inline--fa fa-graduation-cap fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"/><path fill="currentColor" d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"/>
						</div>
						<div>
							<h5 class="font-weight-bold">Educational Details (Optional)</h5>
						</div>
					</div>
					<div class="d-flex align-items-center">
						<div class="">
							<button type="button" class="btn btn-primary my-3">Add Details</button>
						</div>
             <div class="ml-5">
							<div class="svg-edit3" onclick="edudetailsinputsfun()" id="educationinputsedit">
								<span class="fcr" title="Edit Details">
									<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
										<path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z">
										</path>
									</svg>
								</span>
							</div>
							<div class="d-flex">
								<div class="svg-tick d-none" id="tick-svg2">
									<span title="Save All Education Details">
										<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
											<path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z">
											</path>
										</svg>
									</span>
								</div>
								<div class="svg-X ml-3 d-none" onclick="edudetailsX()" id="X-svg2">
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
					<div class="d-block" id="educationDegreeDisplay">
						<div class="row">
							<div class="col-12 col-sm-6">
								<h6>Degree</h6>
								<h6 class="text-muted">B.com</h6>
							</div>
							<div class="col-12 col-sm-6">
								<h6>Institue Name</h6>
								<h6 class="text-muted">SRR</h6>
							</div>
						</div>
						<p class="py-2 m-0 mt-2">Time Period</p>
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
								<div class="row text-muted">
									<div class="col-12 col-sm-6">
										<p>June</p>
									</div>
									<div class="col-12 col-sm-6">
										<p>1997</p>
									</div>
								</div>
							</div>
							<div class="col-12 col-sm-6">
								<div class="row">
									<div class="d-block d-sm-none pl-3">
										<h6>To</h6>
									</div>
									<div class="col-12 col-sm-6 text-muted">
										<p>April</p>
									</div>
									<div class="col-12 col-sm-6 text-muted">
										<p>2000</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="d-none" id="educationDegreeEdit">
						<div class="row py-4">
							<div class="col-12 col-sm-6">
								<div>
									<label for="Degree"/>Degree
									<input id="Degree" placeholder="Enter Your Degree" type="text" class="form-control py-4"/>
								</div>
							</div>
							<div class="col-12 col-sm-6">
								<div class="pt-2 pt-sm-0">
									<label for="Institue-Name">Institue Name</label>
									<input id="Institue-Name" placeholder="Enter Your Institute Name" type="text" class="form-control py-4"/>
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
												<option value="Year">---Year---</option>
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
											<select name="cars" id="cars" class="py-2 px-3 form-control"/>
												<option value="Year">---Year---</option>
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
										</div>
									</div>
									<div class="pl-3 pt-4">
										<label for="lfname"/> 
											<input type="radio" id="lfname" name="educationDegree"/>
											<span>This is my Highest Degree</span>
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
export default EducationalInfo;