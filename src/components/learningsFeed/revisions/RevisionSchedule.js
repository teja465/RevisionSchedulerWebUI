import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function RevisionSchedule({revisionsList}) {
  
  const getSpecialNumber=(number)=>{
    const specialNumbers={
      1:"1'st",
      2:"2'nd",
      3:"3'rd",
      4:"4'th",
      5:"5'th",
    }
    if (specialNumbers[number] != undefined){
      return specialNumbers[number];
    }
    return `${number}'th`

  }
  const  getFormattedLabel=(ind,Scheduleddate)=>{
    return `${getSpecialNumber(ind)} revision on ${Scheduleddate}`
  }
  revisionsList.map((ele,ind)=>{
  })
  const getNodeId = (num)=>{
    num=num+1
    return num.toString()
  }
  
  return (
    <TreeView
      aria-label="multi-select"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{  flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Revisions">
        {revisionsList.map((ele,ind)=>< TreeItem key={ind}  nodeId={`a${getNodeId(ind)}`} label={getFormattedLabel(ind+1,ele.date)} />)}
      </TreeItem>
     
    </TreeView>
  );
}
