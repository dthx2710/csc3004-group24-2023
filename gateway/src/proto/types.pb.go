// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.30.0
// 	protoc        v4.23.2
// source: types.proto

package proto

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type UserInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	UserId         string `protobuf:"bytes,1,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	Username       string `protobuf:"bytes,2,opt,name=username,proto3" json:"username,omitempty"`
	UserType       string `protobuf:"bytes,3,opt,name=user_type,json=userType,proto3" json:"user_type,omitempty"`
	ConstituencyId string `protobuf:"bytes,4,opt,name=constituency_id,json=constituencyId,proto3" json:"constituency_id,omitempty"`
}

func (x *UserInfo) Reset() {
	*x = UserInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_types_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UserInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UserInfo) ProtoMessage() {}

func (x *UserInfo) ProtoReflect() protoreflect.Message {
	mi := &file_types_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UserInfo.ProtoReflect.Descriptor instead.
func (*UserInfo) Descriptor() ([]byte, []int) {
	return file_types_proto_rawDescGZIP(), []int{0}
}

func (x *UserInfo) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *UserInfo) GetUsername() string {
	if x != nil {
		return x.Username
	}
	return ""
}

func (x *UserInfo) GetUserType() string {
	if x != nil {
		return x.UserType
	}
	return ""
}

func (x *UserInfo) GetConstituencyId() string {
	if x != nil {
		return x.ConstituencyId
	}
	return ""
}

type PollInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	StartTime    string `protobuf:"bytes,1,opt,name=start_time,json=startTime,proto3" json:"start_time,omitempty"`
	EndTime      string `protobuf:"bytes,2,opt,name=end_time,json=endTime,proto3" json:"end_time,omitempty"`
	Status       string `protobuf:"bytes,3,opt,name=status,proto3" json:"status,omitempty"`
	Constituency string `protobuf:"bytes,4,opt,name=constituency,proto3" json:"constituency,omitempty"`
	Title        string `protobuf:"bytes,5,opt,name=title,proto3" json:"title,omitempty"`
	Description  string `protobuf:"bytes,6,opt,name=description,proto3" json:"description,omitempty"`
	Compulsory   string `protobuf:"bytes,7,opt,name=compulsory,proto3" json:"compulsory,omitempty"`
}

func (x *PollInfo) Reset() {
	*x = PollInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_types_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PollInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PollInfo) ProtoMessage() {}

func (x *PollInfo) ProtoReflect() protoreflect.Message {
	mi := &file_types_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PollInfo.ProtoReflect.Descriptor instead.
func (*PollInfo) Descriptor() ([]byte, []int) {
	return file_types_proto_rawDescGZIP(), []int{1}
}

func (x *PollInfo) GetStartTime() string {
	if x != nil {
		return x.StartTime
	}
	return ""
}

func (x *PollInfo) GetEndTime() string {
	if x != nil {
		return x.EndTime
	}
	return ""
}

func (x *PollInfo) GetStatus() string {
	if x != nil {
		return x.Status
	}
	return ""
}

func (x *PollInfo) GetConstituency() string {
	if x != nil {
		return x.Constituency
	}
	return ""
}

func (x *PollInfo) GetTitle() string {
	if x != nil {
		return x.Title
	}
	return ""
}

func (x *PollInfo) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

func (x *PollInfo) GetCompulsory() string {
	if x != nil {
		return x.Compulsory
	}
	return ""
}

type ResultInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PollId      string   `protobuf:"bytes,1,opt,name=poll_id,json=pollId,proto3" json:"poll_id,omitempty"`
	VoteTally   []string `protobuf:"bytes,2,rep,name=vote_tally,json=voteTally,proto3" json:"vote_tally,omitempty"`
	OptionNames []string `protobuf:"bytes,3,rep,name=option_names,json=optionNames,proto3" json:"option_names,omitempty"`
}

func (x *ResultInfo) Reset() {
	*x = ResultInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_types_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ResultInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ResultInfo) ProtoMessage() {}

func (x *ResultInfo) ProtoReflect() protoreflect.Message {
	mi := &file_types_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ResultInfo.ProtoReflect.Descriptor instead.
func (*ResultInfo) Descriptor() ([]byte, []int) {
	return file_types_proto_rawDescGZIP(), []int{2}
}

func (x *ResultInfo) GetPollId() string {
	if x != nil {
		return x.PollId
	}
	return ""
}

func (x *ResultInfo) GetVoteTally() []string {
	if x != nil {
		return x.VoteTally
	}
	return nil
}

func (x *ResultInfo) GetOptionNames() []string {
	if x != nil {
		return x.OptionNames
	}
	return nil
}

type VoteInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PollId   string `protobuf:"bytes,1,opt,name=poll_id,json=pollId,proto3" json:"poll_id,omitempty"`
	UserId   string `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	OptionId string `protobuf:"bytes,3,opt,name=option_id,json=optionId,proto3" json:"option_id,omitempty"`
}

func (x *VoteInfo) Reset() {
	*x = VoteInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_types_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *VoteInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*VoteInfo) ProtoMessage() {}

func (x *VoteInfo) ProtoReflect() protoreflect.Message {
	mi := &file_types_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use VoteInfo.ProtoReflect.Descriptor instead.
func (*VoteInfo) Descriptor() ([]byte, []int) {
	return file_types_proto_rawDescGZIP(), []int{3}
}

func (x *VoteInfo) GetPollId() string {
	if x != nil {
		return x.PollId
	}
	return ""
}

func (x *VoteInfo) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *VoteInfo) GetOptionId() string {
	if x != nil {
		return x.OptionId
	}
	return ""
}

var File_types_proto protoreflect.FileDescriptor

var file_types_proto_rawDesc = []byte{
	0x0a, 0x0b, 0x74, 0x79, 0x70, 0x65, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x06, 0x63,
	0x6f, 0x6d, 0x6d, 0x6f, 0x6e, 0x22, 0x85, 0x01, 0x0a, 0x08, 0x55, 0x73, 0x65, 0x72, 0x49, 0x6e,
	0x66, 0x6f, 0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x64, 0x12, 0x1a, 0x0a, 0x08, 0x75,
	0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x75,
	0x73, 0x65, 0x72, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x1b, 0x0a, 0x09, 0x75, 0x73, 0x65, 0x72, 0x5f,
	0x74, 0x79, 0x70, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x75, 0x73, 0x65, 0x72,
	0x54, 0x79, 0x70, 0x65, 0x12, 0x27, 0x0a, 0x0f, 0x63, 0x6f, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75,
	0x65, 0x6e, 0x63, 0x79, 0x5f, 0x69, 0x64, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0e, 0x63,
	0x6f, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x65, 0x6e, 0x63, 0x79, 0x49, 0x64, 0x22, 0xd8, 0x01,
	0x0a, 0x08, 0x50, 0x6f, 0x6c, 0x6c, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x1d, 0x0a, 0x0a, 0x73, 0x74,
	0x61, 0x72, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09,
	0x73, 0x74, 0x61, 0x72, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x19, 0x0a, 0x08, 0x65, 0x6e, 0x64,
	0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x65, 0x6e, 0x64,
	0x54, 0x69, 0x6d, 0x65, 0x12, 0x16, 0x0a, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x18, 0x03,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x12, 0x22, 0x0a, 0x0c,
	0x63, 0x6f, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x65, 0x6e, 0x63, 0x79, 0x18, 0x04, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x0c, 0x63, 0x6f, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x65, 0x6e, 0x63, 0x79,
	0x12, 0x14, 0x0a, 0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69,
	0x70, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x06, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64, 0x65, 0x73,
	0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x1e, 0x0a, 0x0a, 0x63, 0x6f, 0x6d, 0x70,
	0x75, 0x6c, 0x73, 0x6f, 0x72, 0x79, 0x18, 0x07, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0a, 0x63, 0x6f,
	0x6d, 0x70, 0x75, 0x6c, 0x73, 0x6f, 0x72, 0x79, 0x22, 0x67, 0x0a, 0x0a, 0x52, 0x65, 0x73, 0x75,
	0x6c, 0x74, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x17, 0x0a, 0x07, 0x70, 0x6f, 0x6c, 0x6c, 0x5f, 0x69,
	0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x70, 0x6f, 0x6c, 0x6c, 0x49, 0x64, 0x12,
	0x1d, 0x0a, 0x0a, 0x76, 0x6f, 0x74, 0x65, 0x5f, 0x74, 0x61, 0x6c, 0x6c, 0x79, 0x18, 0x02, 0x20,
	0x03, 0x28, 0x09, 0x52, 0x09, 0x76, 0x6f, 0x74, 0x65, 0x54, 0x61, 0x6c, 0x6c, 0x79, 0x12, 0x21,
	0x0a, 0x0c, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x73, 0x18, 0x03,
	0x20, 0x03, 0x28, 0x09, 0x52, 0x0b, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x4e, 0x61, 0x6d, 0x65,
	0x73, 0x22, 0x59, 0x0a, 0x08, 0x56, 0x6f, 0x74, 0x65, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x17, 0x0a,
	0x07, 0x70, 0x6f, 0x6c, 0x6c, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06,
	0x70, 0x6f, 0x6c, 0x6c, 0x49, 0x64, 0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69,
	0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x64, 0x12,
	0x1b, 0x0a, 0x09, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x5f, 0x69, 0x64, 0x18, 0x03, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x08, 0x6f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x49, 0x64, 0x42, 0x1c, 0x5a, 0x1a,
	0x63, 0x73, 0x63, 0x33, 0x30, 0x30, 0x34, 0x2d, 0x67, 0x72, 0x6f, 0x75, 0x70, 0x32, 0x34, 0x2d,
	0x32, 0x30, 0x32, 0x33, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x33,
}

var (
	file_types_proto_rawDescOnce sync.Once
	file_types_proto_rawDescData = file_types_proto_rawDesc
)

func file_types_proto_rawDescGZIP() []byte {
	file_types_proto_rawDescOnce.Do(func() {
		file_types_proto_rawDescData = protoimpl.X.CompressGZIP(file_types_proto_rawDescData)
	})
	return file_types_proto_rawDescData
}

var file_types_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_types_proto_goTypes = []interface{}{
	(*UserInfo)(nil),   // 0: common.UserInfo
	(*PollInfo)(nil),   // 1: common.PollInfo
	(*ResultInfo)(nil), // 2: common.ResultInfo
	(*VoteInfo)(nil),   // 3: common.VoteInfo
}
var file_types_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_types_proto_init() }
func file_types_proto_init() {
	if File_types_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_types_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UserInfo); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_types_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PollInfo); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_types_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ResultInfo); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_types_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*VoteInfo); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_types_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_types_proto_goTypes,
		DependencyIndexes: file_types_proto_depIdxs,
		MessageInfos:      file_types_proto_msgTypes,
	}.Build()
	File_types_proto = out.File
	file_types_proto_rawDesc = nil
	file_types_proto_goTypes = nil
	file_types_proto_depIdxs = nil
}
