VERSION 5.00
Begin {C62A69F0-16DC-11CE-9E98-00AA00574A4F} BashQueryForm 
   Caption         =   "Add Bash Query - Customer Order"
   ClientHeight    =   5940
   ClientLeft      =   120
   ClientTop       =   465
   ClientWidth     =   6615
   OleObjectBlob   =   "BashQueryForm.frx":0000
   StartUpPosition =   1  'CenterOwner
End
Attribute VB_Name = "BashQueryForm"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False

' ============================================================
' Bash Query Form - For adding customer order queries
' ============================================================

Option Explicit

Private Sub UserForm_Initialize()
    ' Initialize the form
    Me.Caption = "Add Bash Query - Customer Order"
    
    ' Set default values
    txtDateTime.Value = Format(Now, "yyyy-mm-dd hh:mm")
    txtRespondedBy.Value = Environ("USERNAME")
    
    ' Populate query type dropdown
    With cboQueryType
        .AddItem "Order Status"
        .AddItem "Delivery Time"
        .AddItem "Order Issue"
        .AddItem "Product Inquiry"
        .AddItem "Cancellation Request"
        .ListIndex = 0
    End With
    
    ' Populate status dropdown
    With cboStatus
        .AddItem "IN PROGRESS"
        .AddItem "RESPONDED"
        .ListIndex = 0
    End With
End Sub

Private Sub btnSubmit_Click()
    ' Validate and submit the query
    If txtCustomerName.Value = "" Then
        MsgBox "Please enter customer name.", vbExclamation, "Required Field"
        txtCustomerName.SetFocus
        Exit Sub
    End If
    
    If txtOrderID.Value = "" Then
        MsgBox "Please enter order ID.", vbExclamation, "Required Field"
        txtOrderID.SetFocus
        Exit Sub
    End If
    
    If txtQueryDetails.Value = "" Then
        MsgBox "Please enter query details.", vbExclamation, "Required Field"
        txtQueryDetails.SetFocus
        Exit Sub
    End If
    
    ' Add query to sheet
    Call AddQueryToSheet
    
    ' Close form
    Unload Me
End Sub

Private Sub btnCancel_Click()
    ' Close form without saving
    Unload Me
End Sub

Private Sub AddQueryToSheet()
    ' Add the query data to Bash Queries Response sheet
    Dim querySheet As Worksheet
    Set querySheet = Sheets("Bash Queries Response")
    
    ' Find next row
    Dim lastRow As Long
    lastRow = querySheet.Cells(querySheet.Rows.Count, 1).End(xlUp).Row + 1
    
    ' Generate Query ID
    Dim queryID As String
    queryID = "Q" & Format(lastRow - 1, "000")
    
    ' Add data
    With querySheet
        .Cells(lastRow, 1).Value = queryID
        .Cells(lastRow, 2).Value = txtDateTime.Value
        .Cells(lastRow, 3).Value = txtCustomerName.Value
        .Cells(lastRow, 4).Value = txtOrderID.Value
        .Cells(lastRow, 5).Value = cboQueryType.Value
        .Cells(lastRow, 6).Value = txtQueryDetails.Value
        .Cells(lastRow, 7).Value = cboStatus.Value
        .Cells(lastRow, 8).Value = txtResponse.Value
        .Cells(lastRow, 9).Value = txtRespondedBy.Value
        
        ' Calculate response time
        If cboStatus.Value = "RESPONDED" And txtResponse.Value <> "" Then
            If IsNumeric(txtResponseTime.Value) Then
                .Cells(lastRow, 10).Value = txtResponseTime.Value
            Else
                .Cells(lastRow, 10).Value = 5
            End If
        End If
    End With
    
    ' Show confirmation
    MsgBox "Query added successfully!" & vbCrLf & _
           "Query ID: " & queryID & vbCrLf & _
           "Customer: " & txtCustomerName.Value, _
           vbInformation, "Success"
    
    ' Refresh dashboard
    Application.Run "RefreshDashboardMetrics"
End Sub

Private Sub cboStatus_Change()
    ' Enable/disable response fields based on status
    If cboStatus.Value = "RESPONDED" Then
        txtResponse.Enabled = True
        txtResponseTime.Enabled = True
    Else
        txtResponse.Enabled = False
        txtResponseTime.Enabled = False
        txtResponse.Value = ""
        txtResponseTime.Value = ""
    End If
End Sub
