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
      window.initResponsiveComponent();
    });
  }

  deleteWorkflow = (event) => {
    var id = event.target.getAttribute("data-id");
    window.fetch("/admin/workflows/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: id })}).then(response => {
      if (response.status == 200)
        this.setState({ dataSource: this.state.dataSource.filter(function (elem) { return elem.Id != id; }) });
      else
        console.log(response);
    });
  }

  renderTable(props) {
    if (props.parent.state.dataSource.length === 0) {
      return null;
    }
    else {
      return (
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-warning">
              <p>
                گام سوم، به منظور راه‌اندازی و مدیریت مانیتورینگ سرور و یا سایت، کافیست چرخه‌کاری جدید ایجاد و فرآیندها را به هم متصل کنید.
              </p>
            </div>
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
                          <a data-id={item.Id} onClick={item.Access ? `` : (event) => props.onDeleteWorkflow(event)} className={`${item.Access ? "disabled-link" : ""}`}> حذف </a>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <this.renderTable parent={this} onDeleteWorkflow={this.deleteWorkflow} />
    );
  }
}

export default Home;
