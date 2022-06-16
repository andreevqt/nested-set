'use strict';

const createGenerateId = () => {
  let count = 1;
  return () => count++;
};

let nodes = [];
const generateId = createGenerateId();

const createNode = (value) => {
  const node = {
    id: generateId(),
    parentId: null,
    value,
    lft: 1,
    rgt: 2,
  };
  nodes.push(node);
  return node;
};

const insertNode = (parentId, node) => {
  const parent = nodes.find((node) => node.id === parentId);
  const newLft = parent.rgt;
  nodes.filter((node) => node.rgt >= newLft).forEach((node) => node.rgt += 2);
  nodes.filter((node) => node.lft > newLft).forEach((node) => node.lft += 2);
  node.lft = newLft;
  node.rgt = newLft + 1;
  node.parentId = parentId;
  return node;
};

const deleteNode = (nodeId) => {
  const node = nodes.find((node) => node.id == nodeId);
  const newLft = node.lft;
  const newRgt = node.rgt;
  // const hasLeafs = node.rgt - node.lft > 1;
  const width = node.rgt - node.lft + 1;

  // delete node and remove subtree
  nodes = nodes.filter((node) => node.id !== nodeId);
  nodes = nodes.filter((node) => !(node.lft >= newLft && node.lft <= newRgt));
  nodes.filter((node) => node.rgt > newRgt).forEach((node) => node.rgt = node.rgt - width);
  nodes.filter((node) => node.lft > newLft).forEach((node) => node.lft = node.lft - width);
};

const move = (nodeId, parentId) => {
  const node = nodes.find((node) => node.id === nodeId);
  const parent = nodes.find((node) => node.id === parentId);
  // create temp array
  const temp = nodes.filter((n) => n.lft >= node.lft && n.rgt <= node.rgt);
  console.log(temp);
}

const root = createNode("Home");
insertNode(root.id, createNode("HTML&CSS"));
insertNode(root.id, createNode("JS"));
const php = createNode("PHP");
insertNode(root.id, php);
insertNode(php.id, createNode("CLOUD"));
insertNode(php.id, createNode("DEBUGGING"));
console.log(nodes);
move(php.id, root.id)
