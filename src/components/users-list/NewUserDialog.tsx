import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
interface IProps {
	dialogClose: () => void;
}

function NewUserDialog(props: IProps) {
	const { dialogClose } = props;

  return (
    <>
			<Dialog title={"Please confirm"} onClose={() => dialogClose()}>
				<p style={{ margin: "25px", textAlign: "center" }}>
					Are you sure you want to continue?
				</p>
				<DialogActionsBar>
					<button
						className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
						onClick={() => dialogClose()}
					>
						No
					</button>
					<button
						className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
						onClick={() => dialogClose()}
					>
						Yes
					</button>
				</DialogActionsBar>
			</Dialog>
    </>
  );
}
export default NewUserDialog;
