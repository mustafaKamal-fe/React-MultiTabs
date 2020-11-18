import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';


declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string | undefined;
    '--tree-view-bg-color'?: string | undefined;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgcolor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

interface TreeItemsStyledProps {
  color: string;
  bgcolor: string;
}

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
      },
      '& svg': {
        color: ({ color }: TreeItemsStyledProps) => color,
      },
    },
    content: {
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
      '&:focus > $content, &$selected > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent',
      },
    },

    label: {
      fontWeight: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    },
  })
);

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgcolor,
    ...other
  } = props;
  const classes = useTreeItemStyles({ bgcolor, color });

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
        </div>
      }
      style={{
         color,
        backgroundColor: bgcolor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

interface TransctionsTreeProps {
  operations: any;
  handleAddPage: any;
}

const useStyles = makeStyles(
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
  })
);

const TransactionsTree = ({
  operations,
  handleAddPage,
}: TransctionsTreeProps) => {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      multiSelect={false}
    >
      {operations.map((op: any, index: number) => {
        if (op.nested) {
          return (
            <StyledTreeItem
              key={index}
              nodeId={`${index}`}
              labelText={op.name}
              labelIcon={op.icon}
            >
              {op.nested.map((nestedItem: any, nestedIndex: number) => {
                return (
                  <StyledTreeItem
                    key={nestedIndex}
                    nodeId={`${nestedIndex + Math.random()}`}
                    labelText={nestedItem.name}
                    labelIcon={nestedItem.icon}
                    color={nestedItem.color}
                    bgcolor={nestedItem.bgcolor}
                    onClick={() => handleAddPage(nestedItem)}
                  />
                );
              })}
            </StyledTreeItem>
          );
        }
        return (
          <StyledTreeItem
            key={index}
            nodeId={`${index}`}
            labelText={op.name}
            labelIcon={op.icon}
            bgcolor={op.bjColor}
            color={op.color}
            onClick={() => handleAddPage(op)}
          />
        );
      })}
    </TreeView>
  );
};

export default TransactionsTree;
