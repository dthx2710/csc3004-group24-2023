// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.30.0
// 	protoc        v4.22.0--rc3
// source: vote-service_gw.proto

package proto

import (
	_ "google.golang.org/genproto/googleapis/api/annotations"
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

type SubmitVoteRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	VoteInfo *VoteInfo `protobuf:"bytes,1,opt,name=vote_info,json=voteInfo,proto3" json:"vote_info,omitempty"`
}

func (x *SubmitVoteRequest) Reset() {
	*x = SubmitVoteRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_vote_service_gw_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SubmitVoteRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SubmitVoteRequest) ProtoMessage() {}

func (x *SubmitVoteRequest) ProtoReflect() protoreflect.Message {
	mi := &file_vote_service_gw_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SubmitVoteRequest.ProtoReflect.Descriptor instead.
func (*SubmitVoteRequest) Descriptor() ([]byte, []int) {
	return file_vote_service_gw_proto_rawDescGZIP(), []int{0}
}

func (x *SubmitVoteRequest) GetVoteInfo() *VoteInfo {
	if x != nil {
		return x.VoteInfo
	}
	return nil
}

type SubmitVoteResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Success bool   `protobuf:"varint,1,opt,name=success,proto3" json:"success,omitempty"`
	Message string `protobuf:"bytes,2,opt,name=message,proto3" json:"message,omitempty"`
}

func (x *SubmitVoteResponse) Reset() {
	*x = SubmitVoteResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_vote_service_gw_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SubmitVoteResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SubmitVoteResponse) ProtoMessage() {}

func (x *SubmitVoteResponse) ProtoReflect() protoreflect.Message {
	mi := &file_vote_service_gw_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SubmitVoteResponse.ProtoReflect.Descriptor instead.
func (*SubmitVoteResponse) Descriptor() ([]byte, []int) {
	return file_vote_service_gw_proto_rawDescGZIP(), []int{1}
}

func (x *SubmitVoteResponse) GetSuccess() bool {
	if x != nil {
		return x.Success
	}
	return false
}

func (x *SubmitVoteResponse) GetMessage() string {
	if x != nil {
		return x.Message
	}
	return ""
}

var File_vote_service_gw_proto protoreflect.FileDescriptor

var file_vote_service_gw_proto_rawDesc = []byte{
	0x0a, 0x15, 0x76, 0x6f, 0x74, 0x65, 0x2d, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x5f, 0x67,
	0x77, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0c, 0x76, 0x6f, 0x74, 0x65, 0x5f, 0x73, 0x65,
	0x72, 0x76, 0x69, 0x63, 0x65, 0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70,
	0x69, 0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x1a, 0x0b, 0x74, 0x79, 0x70, 0x65, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x22, 0x42, 0x0a, 0x11, 0x53, 0x75, 0x62, 0x6d, 0x69, 0x74, 0x56, 0x6f, 0x74, 0x65, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x2d, 0x0a, 0x09, 0x76, 0x6f, 0x74, 0x65, 0x5f, 0x69, 0x6e,
	0x66, 0x6f, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x10, 0x2e, 0x63, 0x6f, 0x6d, 0x6d, 0x6f,
	0x6e, 0x2e, 0x56, 0x6f, 0x74, 0x65, 0x49, 0x6e, 0x66, 0x6f, 0x52, 0x08, 0x76, 0x6f, 0x74, 0x65,
	0x49, 0x6e, 0x66, 0x6f, 0x22, 0x48, 0x0a, 0x12, 0x53, 0x75, 0x62, 0x6d, 0x69, 0x74, 0x56, 0x6f,
	0x74, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x18, 0x0a, 0x07, 0x73, 0x75,
	0x63, 0x63, 0x65, 0x73, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x07, 0x73, 0x75, 0x63,
	0x63, 0x65, 0x73, 0x73, 0x12, 0x18, 0x0a, 0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x32, 0x69,
	0x0a, 0x04, 0x56, 0x6f, 0x74, 0x65, 0x12, 0x61, 0x0a, 0x0a, 0x53, 0x75, 0x62, 0x6d, 0x69, 0x74,
	0x56, 0x6f, 0x74, 0x65, 0x12, 0x1f, 0x2e, 0x76, 0x6f, 0x74, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x2e, 0x53, 0x75, 0x62, 0x6d, 0x69, 0x74, 0x56, 0x6f, 0x74, 0x65, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x20, 0x2e, 0x76, 0x6f, 0x74, 0x65, 0x5f, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x2e, 0x53, 0x75, 0x62, 0x6d, 0x69, 0x74, 0x56, 0x6f, 0x74, 0x65, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x10, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x0a, 0x3a,
	0x01, 0x2a, 0x22, 0x05, 0x2f, 0x76, 0x6f, 0x74, 0x65, 0x42, 0x1c, 0x5a, 0x1a, 0x63, 0x73, 0x63,
	0x33, 0x30, 0x30, 0x34, 0x2d, 0x67, 0x72, 0x6f, 0x75, 0x70, 0x32, 0x34, 0x2d, 0x32, 0x30, 0x32,
	0x33, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_vote_service_gw_proto_rawDescOnce sync.Once
	file_vote_service_gw_proto_rawDescData = file_vote_service_gw_proto_rawDesc
)

func file_vote_service_gw_proto_rawDescGZIP() []byte {
	file_vote_service_gw_proto_rawDescOnce.Do(func() {
		file_vote_service_gw_proto_rawDescData = protoimpl.X.CompressGZIP(file_vote_service_gw_proto_rawDescData)
	})
	return file_vote_service_gw_proto_rawDescData
}

var file_vote_service_gw_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_vote_service_gw_proto_goTypes = []interface{}{
	(*SubmitVoteRequest)(nil),  // 0: vote_service.SubmitVoteRequest
	(*SubmitVoteResponse)(nil), // 1: vote_service.SubmitVoteResponse
	(*VoteInfo)(nil),           // 2: common.VoteInfo
}
var file_vote_service_gw_proto_depIdxs = []int32{
	2, // 0: vote_service.SubmitVoteRequest.vote_info:type_name -> common.VoteInfo
	0, // 1: vote_service.Vote.SubmitVote:input_type -> vote_service.SubmitVoteRequest
	1, // 2: vote_service.Vote.SubmitVote:output_type -> vote_service.SubmitVoteResponse
	2, // [2:3] is the sub-list for method output_type
	1, // [1:2] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_vote_service_gw_proto_init() }
func file_vote_service_gw_proto_init() {
	if File_vote_service_gw_proto != nil {
		return
	}
	file_types_proto_init()
	if !protoimpl.UnsafeEnabled {
		file_vote_service_gw_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SubmitVoteRequest); i {
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
		file_vote_service_gw_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SubmitVoteResponse); i {
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
			RawDescriptor: file_vote_service_gw_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_vote_service_gw_proto_goTypes,
		DependencyIndexes: file_vote_service_gw_proto_depIdxs,
		MessageInfos:      file_vote_service_gw_proto_msgTypes,
	}.Build()
	File_vote_service_gw_proto = out.File
	file_vote_service_gw_proto_rawDesc = nil
	file_vote_service_gw_proto_goTypes = nil
	file_vote_service_gw_proto_depIdxs = nil
}
