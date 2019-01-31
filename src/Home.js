import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    window.fetch("/admin/workflows/getWorkflows", { method: "POST", headers: { "Content-Type": "application/json" } }).then(response => response.json()).then(data => {
      this.setState({ dataSource: data });
    });
  }

  renderTable(props) {
    if (props.parent.state.dataSource.length === 0) {
      return null;
    }
    else {
      return (
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>ردیف</th>
              <th>عنوان</th>
              <th>مالک چرخه</th>
              <th>دسترسی</th>
              <th>وضعیت</th>
              <th>تعداد گردش کار در حال اجرا</th>
              <th data-res="false"></th>
            </tr>
          </thead>
          <tbody>
            {
              props.parent.state.dataSource.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.Subject}</td>
                    <td>{item.Owner}</td>
                    <td>{item.Access ? "عمومی" : "مخفی"}</td>
                    <td>{item.Status ? "فعال" : "غیرفعال"}</td>
                    <td>{item.WorkflowInprogressCount}</td>
                    <td data-res="false">
                      <a href={`/Admin/Workflows/Edit/${item.Id}`}> شخصی سازی </a> |
                      <a href={`/Admin/Workflows/EditProperties/${item.Id}?ReturnUrl=/admin/workflows`}> ویرایش </a> |
                      <a href={`/Admin/Workflows/Delete/${item.Id}`}> حذف </a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      );
    }
  }

  render() {
    return (
      <this.renderTable parent={this} />
    );
  }
}

export default Home;
