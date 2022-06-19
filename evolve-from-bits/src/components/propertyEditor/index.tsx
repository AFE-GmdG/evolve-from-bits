import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import ChevronRightTwoTone from "@material-ui/icons/ChevronRightRounded";

const useStyles = makeStyles((_theme: Theme) => createStyles({
  groupContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  groupHeader: {
    flex: "0 0 auto",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "auto auto",
    justifyItems: "strech",
    alignItems: "center",
    gap: "0.2rem",
  },
  groupHeaderIcon: {
    gridColumn: "1",
    gridRow: "1",
  },
  groupHeaderLabel: {
    gridColumn: "2",
    gridRow: "1",
  },
  expanded: {},
  groupList: {
    gridColumn: "2/3",
    gridRow: "2",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    visibility: "collapse",
    listStyle: "none",
    padding: "0",
    margin: "0",

    "&$expanded": {
      visibility: "visible",
    },
  },
  groupListItem: {
  },
}));

type GroupState = {
  expanded: boolean;
};

export type PropertyMetadata = {
  propertyName: string;
  propertyDescription?: string;
  groupName?: string;
  readonly?: boolean;
  customEditor?: React.ComponentType<any>;
};

export type PropertyMetadataArray = PropertyMetadata[];
type PropertyMetadataGroupMap = { [groupName: string]: PropertyMetadataArray };

export type PropertyEditorProps<TArray extends PropertyMetadataArray> = {
  className?: string;
  metadataArray: TArray;
  object: { [key in TArray[number]["propertyName"]]: any } | null;
};

const PropertyEditor: React.FC<PropertyEditorProps<PropertyMetadataArray>> = ({
  className,
  metadataArray,
  object,
}) => {
  const classes = useStyles();

  const groups = React.useMemo(
    () => {
      const map = metadataArray.reduce<PropertyMetadataGroupMap>((acc, propertyMetadata) => {
        const groupName = propertyMetadata.groupName || "Default";
        return {
          ...acc,
          [groupName]: [
            ...(acc[groupName] || []),
            propertyMetadata,
          ],
        };
      }, {});

      Object.values(map).forEach((group) => {
        group.sort((a, b) => a.propertyName.localeCompare(b.propertyName));
      });

      return map;
    },
    [metadataArray],
  );

  const [groupStates, setGroupStates] = React.useState<{ [group: string]: GroupState }>({});

  const onExpandCollapseGroup = (group: string) => {
    setGroupStates((currentGroupStates) => {
      const groupState = group in currentGroupStates ? currentGroupStates[group] : { expanded: false };

      return {
        ...currentGroupStates,
        [group]: {
          ...groupState,
          expanded: !groupState.expanded,
        },
      };
    });
  };

  if (!object) {
    return (
      <div className={`${classes.groupContainer} ${className}`}>
        <Typography variant="h6">
          No object selected
        </Typography>
      </div>
    );
  }

  return (
    <div className={`${classes.groupContainer} ${className}`}>
      {
        Object.entries(groups).map(([groupName, _group]) => (
          <div key={groupName} className={classes.groupHeader}>
            <IconButton
              className={classes.groupHeaderIcon}
              size="small"
              onClick={() => onExpandCollapseGroup(groupName)}
            >
              <ChevronRightTwoTone />
            </IconButton>
            <Typography className={classes.groupHeaderLabel} variant="h6">{groupName}</Typography>
            <ul className={`${classes.groupList} ${(groupName in groupStates && groupStates[groupName].expanded) ? classes.expanded : ""}`}>
              <li className={classes.groupListItem}>
                <Typography variant="body1">
                  Item 1
                </Typography>
              </li>
              <li className={classes.groupListItem}>
                <Typography variant="body1">
                  Item 2
                </Typography>
              </li>
              <li className={classes.groupListItem}>
                <Typography variant="body1">
                  Item 3
                </Typography>
              </li>
            </ul>
          </div>
        ))
      }
    </div>
  );
};

export default PropertyEditor;
