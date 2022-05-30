import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CustomTable from "./Table/customTable";
import CustomButton from "../../shared/Form/Button/button";
import { useNavigate } from "react-router-dom";
import AddBtnModal from "../AddBtnModal/addBtnModal";


type Props = {
  list: any[]
  isPlaceExposure: boolean
}

const DetailPage: React.FC<Props> = (props: Props) => {

  const { list, isPlaceExposure } = props;
  const [newList, setNewList] = useState<any[]>(list);

  const headers = isPlaceExposure ? ["Name", "Date", "Hours", "Is Crowded?"] : ["Name", "Date", "Hours", "Is Practicing Social Distancing?"];
  const todayDate = new Date(new Date().setHours(0, 0, 0, 0));
  const earliestDate = new Date(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0));

  let navigate = useNavigate();

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    let isChecked = e.target.checked;

    if (isChecked) {
      setNewList(
        list.filter((item) => {
          if (new Date(new Date(item.date).setHours(0, 0, 0, 0)) <= todayDate && new Date(new Date(item.date).setHours(0, 0, 0, 0)) >= earliestDate) {
            return item
          }
        })
      );
    }
    else {
      setNewList(list);
    }


  }

  useEffect(() => {
    setNewList(list);
  }, [list])

  return (
    <div className="mx-5 my-3">

      <CustomButton
        btnClass="btn-shadow-blue-outline"
        variant=""
        disabled={false}
        type="button"
        method={() => {
          navigate("/");
        }}

      >
        &#x2190; Back to homepage
      </CustomButton>
      <h1 className="text-center">
        {
          isPlaceExposure ? "Visited Places List" : "Social Interactions List"
        }
      </h1>

      <div className="mx-5 mt-3 px-5">
        <div className="my-4 d-flex justify-content-between">
          <AddBtnModal
            name={isPlaceExposure ? "Add Place Exposure" : "Add Social Interaction"}
            isPlaceExposure={isPlaceExposure}
            variant=""
            btnClass="btn-shadow-blue"
            dataList={list}
          />

          <Form.Check
            className={""}
            type={"checkbox"}
            id={"form-check-2"}
            label={"Display records within last 14 days"}
            onChange={handleCheckbox}
          />

        </div>

        <CustomTable
          dataList={newList}
          headers={headers}
          isPlaceExposure={isPlaceExposure}
        />

       
      </div>




    </div>
  );
};

export default DetailPage;
