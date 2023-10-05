import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import Search from "antd/es/input/Search";
import Request from "../request";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import async from "async";

const BookList = () => {
  const dispatch = useDispatch();
  const [bookData, setBookData] = useState();
  const [paginationData, setPaginationData] = useState();

  const apifunction = async (val) => {
    const { data, pagination } = await Request.getBooks({
      page: val?.page,
      title: val?.title,
    });
    setPaginationData(pagination);
    setBookData(data);
  };
  useEffect(() => {
    apifunction();
  }, []);
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "titlr",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Pages",
      dataIndex: "pages",
      key: "pages",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink
            to="/addBook"
            onClick={() => {
              dispatch({
                type: "SET_CURRENT_USER",
                payload: { ...record },
              });
            }}
          >
            Edit
          </NavLink>
        </Space>
      ),
    },
  ];
  const onSearch = (value) => {
    if (!value) {
      apifunction();
    } else {
      var newData = [];
      async.forEach(bookData, (val, cb) => {
        if (val?.title === value) {
          newData.push(val);
          cb();
        } else {
          cb();
        }
      });
      setBookData(newData);
    }
  };
  return (
    <>
      <div style={{ overflowX: "auto", padding: "0 1rem 0 4rem" }}>
        <h2>List Of Books added.</h2>
        <Search
          placeholder="Enter Title"
          allowClear
          enterButton="Search"
          size="small"
          onSearch={onSearch}
          style={{ width: "20vw", float: "left" }}
        />
        <NavLink
          to="/addBook"
          onClick={() => {
            dispatch({
              type: "SET_CURRENT_USER",
              payload: null,
            });
          }}
        >
          <Button
            style={{
              backgroundColor: "rgb(42, 118, 172)",
              color: "white",
              float: "right",
            }}
          >
            Add Book
          </Button>
        </NavLink>
        <Table
          columns={columns}
          dataSource={bookData}
          pagination={{
            current: paginationData?.currentPage,
            pageSize: paginationData?.pageSize,
            total: paginationData?.totalElements,
            onChange: (page) => apifunction(page),
          }}
        />
      </div>
    </>
  );
};

export default BookList;
