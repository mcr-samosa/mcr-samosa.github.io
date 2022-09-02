import { Link } from "react-router-dom";
import { Card } from "react-bulma-components";
import { ContainerListItem } from "../../models/container-list-item";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "./SnackCategoryList.css";

interface SnackProps {
  key: string;
  snackTypeName: string;
  containerList: ContainerListItem[];
}

const SnackCategoryList = ({ snackTypeName, containerList }: SnackProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const matchingContainersList = containerList
    .filter((item) => item.snackTypeName == snackTypeName)
    .map((containerListItem) => (
      <Link
        key={containerListItem.containerId}
        to={`/container/${containerListItem.containerId}`}
      >
        <Card className="mb-2 snack-item">
          <Card.Content>
            #{containerListItem.containerId} &mdash;{" "}
            {containerListItem.contentsText}
          </Card.Content>
        </Card>
      </Link>
    ));

  return (
    <div>
      {matchingContainersList.length > 0 ? (
        <Card
          className={`container-list mb-5${isVisible ? "" : " closed"}`}
          style={{ height: `${matchingContainersList.length * 5 + 7.375}rem` }}
        >
          <Card.Header
            className="p-1 is-clickable"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            <Card.Header.Title>
              <h2>{snackTypeName}</h2>
            </Card.Header.Title>
            <Card.Header.Icon>
              <FontAwesomeIcon icon={isVisible ? faAngleUp : faAngleDown} />
            </Card.Header.Icon>
          </Card.Header>
          <Card.Content>{matchingContainersList}</Card.Content>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SnackCategoryList;
