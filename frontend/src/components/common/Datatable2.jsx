import React, { Fragment, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { deleteFetch, getFetch, postFetch } from '../../config/fetchData'
import { UserState } from '../../context/User';
const Datatable = ({ myData, myClass, multiSelectOption, pagination, url, edit }) => {
	const { user, setUser } = UserState();
	const [open, setOpen] = useState(false);
	const [checkedValues, setCheckedValues] = useState([]);
	const [data, setData] = useState(myData);
	const [projects, setProjects] = useState([]);
	const selectRow = (e, i) => {
		if (!e.target.checked) {
			setCheckedValues(checkedValues.filter((item, j) => i !== item));
		} else {
			checkedValues.push(i);
			setCheckedValues(checkedValues);
		}
	};


	const handleRemoveRow = () => {
		deleteFetch(`${url}`, { id: checkedValues }).then((data) => {
			if (data.Data) {
				const updatedData = myData.filter(function (el) {
					return checkedValues.indexOf(el.id) < 0;
				});
				setData([...updatedData]);
				toast.success("Successfully Deleted !");
			} else {
				toast.error("Error Deleted !");
			}
		}).catch((err) => { toast.error("Error Deleted !"); })

	};

	const renderEditable = (cellInfo) => {
		return (
			<div
				style={{ backgroundColor: "#fafafa" }}
				contentEditable
				suppressContentEditableWarning
				onBlur={(e) => {
					data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML;
					setData({ myData: data });
				}}
				dangerouslySetInnerHTML={{
					__html: myData[cellInfo.index][cellInfo.index.id],
				}}
			/>
		);
	};

	const handleValidSubmit = (e,index)=>{
		e.preventDefault();
		postFetch(``)
	};

	const handleDelete = (index) => {
		console.log(data[index]);
		if (window.confirm("Are you sure you wish to delete this item?") && user) {
			const del = data;
			deleteFetch(`${url}`, { id: data[index].id }, user.accessToken).then((data) => {
				if (data.Data) {
					del.splice(index, 1);
					setData([...del]);
					toast.success("Successfully Deleted !");
				} else {
					toast.error("Error Deleted !");
				}
			}).catch((err) => { toast.error("Error Deleted !"); })
		}
	};
	const onOpenModal = () => {
		if (projects.length === 0 && user) {
			getFetch(`/Project/all`, user.accessToken).then((data) => {
				if (data.ErrorCode == 98) {
					setUser(data.Data);
					localStorage.setItem("userInfo", JSON.stringify(data.Data));
					toast.warning("Please Try Again!");
					setOpen(false);
				} else if (data.ErrorCode == 0) {
					let listProject = data.Data.map(project => {
						return {
							id: project._id,
							code: project.code,
							name: project.name,
							description: project.description,
						};
					})
					setProjects(listProject);
				}
			})
		}
		setOpen(true);
	};

	const onCloseModal = () => {
		setOpen(false);
	};

	const Capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const columns = [];
	for (const key in myData[0]) {
		let editable = renderEditable;
		if (key === "image") {
			editable = null;
		}
		if (key === "status") {
			editable = null;
		}
		if (key === "avtar") {
			editable = null;
		}
		if (key === "vendor") {
			editable = null;
		}
		if (key === "order_status") {
			editable = null;
		}

		columns.push({
			name: <b>{Capitalize(key.toString())}</b>,
			header: <b>{Capitalize(key.toString())}</b>,
			selector: row => row[key],
			Cell: editable,
			style: {
				textAlign: "center",
			},
		});
	}

	if (multiSelectOption === true) {
		columns.push({
			name: (
				<button
					className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
					onClick={(e) => {
						if (window.confirm("Are you sure you wish to delete this item?"))
							handleRemoveRow();
					}}
				>
					Delete
				</button>
			),
			id: "delete",
			accessor: (str) => "delete",
			cell: (row) => (
				<div>
					<span>
						<i
							className="fa fa-trash"
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "#e4566e",
							}}
						></i>
					</span>
				</div>
			),
			style: {
				textAlign: "center",
			},
			sortable: false,
		});
	} else {
		columns.push({
			name: <b>Action</b>,
			id: "delete",
			accessor: (str) => "delete",
			cell: (row, index) => (
				<div>
					<span onClick={() => handleDelete(index)}>
						<i
							className="fa fa-trash"
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "#e4566e",
							}}
						></i>
					</span>
				</div>
			),
			style: {
				textAlign: "center",
			},
			sortable: false,
		});
	}
	return (
		<div>
			<Fragment>
				<DataTable
					data={data}
					columns={columns}
					className={myClass}
					pagination={pagination}
					striped={true}
					center={true}
				/>

				<ToastContainer />
			</Fragment>
		</div>
	);
};

export default Datatable;