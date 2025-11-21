# Context7 MCP Usage Rules / Quy tắc sử dụng Context7 MCP

## English Version

### Overview
Context7 MCP provides access to up-to-date documentation for libraries and frameworks. This document outlines best practices for using Context7 MCP tools effectively.

### Available Tools

1. **resolve-library-id**: Resolves a package/product name to a Context7-compatible library ID
2. **get-library-docs**: Fetches up-to-date documentation for a library

### Usage Workflow

#### Step 1: Resolve Library ID First
**ALWAYS** call `resolve-library-id` before `get-library-docs` unless the user explicitly provides a library ID in the format `/org/project` or `/org/project/version`.

```
CORRECT: resolve-library-id("react") → get-library-docs("/facebook/react")
INCORRECT: get-library-docs("react") ❌
```

#### Step 2: Select the Best Match
When `resolve-library-id` returns multiple results, select based on:
- **Name similarity**: Exact matches prioritized
- **Description relevance**: Match to user's intent
- **Documentation coverage**: Higher code snippet counts preferred
- **Source reputation**: High or Medium reputation sources prioritized
- **Benchmark Score**: Higher scores (max 100) indicate better quality

#### Step 3: Use Topic Parameter Effectively
When calling `get-library-docs`, use the `topic` parameter to focus on specific areas:
- Be specific: "hooks", "routing", "authentication", "state management"
- If initial results are insufficient, try different topics or pagination

#### Step 4: Paginate When Needed
If context is insufficient:
- Try `page=2`, `page=3`, etc. (max: 10)
- Use the same topic for consistency

### Best Practices

#### DO ✅
- Always resolve library ID first (unless user provides exact ID)
- Provide clear explanations for library selection
- Use specific topics to narrow down documentation
- Paginate when more context is needed
- Handle ambiguous queries by requesting clarification
- Acknowledge when multiple good matches exist

#### DON'T ❌
- Skip `resolve-library-id` step (unless user provides exact ID)
- Guess or make up library IDs
- Use vague topics
- Assume first result is always correct
- Ignore benchmark scores and reputation

### Example Workflows

#### Example 1: Basic Library Lookup
```
User: "How do I use React hooks?"

1. resolve-library-id("react")
2. Select: /facebook/react (highest score, exact match)
3. get-library-docs("/facebook/react", topic="hooks")
```

#### Example 2: Specific Version
```
User: "Show me Next.js 14 routing docs"

1. resolve-library-id("next.js")
2. Select: /vercel/next.js/v14.x.x
3. get-library-docs("/vercel/next.js/v14.x.x", topic="routing")
```

#### Example 3: User Provides Exact ID
```
User: "Get docs for /mongodb/docs"

Skip resolve-library-id, directly:
1. get-library-docs("/mongodb/docs")
```

#### Example 4: Ambiguous Query
```
User: "Show me docs for axios"

1. resolve-library-id("axios")
2. If multiple matches: Explain differences and select most relevant
3. get-library-docs(selected_id)
```

### Error Handling

- **No matches found**: Suggest query refinements, check for typos
- **Multiple equally good matches**: Acknowledge and explain selection reasoning
- **Insufficient context**: Use pagination or try different topics
- **Invalid library ID**: Re-run resolve-library-id with corrected name

---

## Phiên bản Tiếng Việt

### Tổng quan
Context7 MCP cung cấp quyền truy cập vào tài liệu cập nhật cho các thư viện và framework. Tài liệu này nêu rõ các phương pháp hay nhất để sử dụng công cụ Context7 MCP hiệu quả.

### Các công cụ có sẵn

1. **resolve-library-id**: Chuyển đổi tên package/sản phẩm thành library ID tương thích với Context7
2. **get-library-docs**: Lấy tài liệu cập nhật cho một thư viện

### Quy trình sử dụng

#### Bước 1: Giải quyết Library ID trước
**LUÔN LUÔN** gọi `resolve-library-id` trước `get-library-docs` trừ khi người dùng cung cấp rõ ràng library ID theo định dạng `/org/project` hoặc `/org/project/version`.

```
ĐÚNG: resolve-library-id("react") → get-library-docs("/facebook/react")
SAI: get-library-docs("react") ❌
```

#### Bước 2: Chọn kết quả phù hợp nhất
Khi `resolve-library-id` trả về nhiều kết quả, chọn dựa trên:
- **Độ tương đồng tên**: Ưu tiên khớp chính xác
- **Độ liên quan mô tả**: Khớp với ý định người dùng
- **Phạm vi tài liệu**: Ưu tiên số lượng code snippet cao hơn
- **Uy tín nguồn**: Ưu tiên nguồn có uy tín High hoặc Medium
- **Điểm Benchmark**: Điểm cao hơn (tối đa 100) cho thấy chất lượng tốt hơn

#### Bước 3: Sử dụng tham số Topic hiệu quả
Khi gọi `get-library-docs`, sử dụng tham số `topic` để tập trung vào các lĩnh vực cụ thể:
- Cụ thể: "hooks", "routing", "authentication", "state management"
- Nếu kết quả ban đầu không đủ, thử các topic khác hoặc phân trang

#### Bước 4: Phân trang khi cần
Nếu ngữ cảnh không đủ:
- Thử `page=2`, `page=3`, v.v. (tối đa: 10)
- Sử dụng cùng topic để đảm bảo tính nhất quán

### Thực hành tốt nhất

#### NÊN ✅
- Luôn giải quyết library ID trước (trừ khi người dùng cung cấp ID chính xác)
- Cung cấp giải thích rõ ràng cho việc chọn thư viện
- Sử dụng topic cụ thể để thu hẹp tài liệu
- Phân trang khi cần thêm ngữ cảnh
- Xử lý các truy vấn mơ hồ bằng cách yêu cầu làm rõ
- Thừa nhận khi có nhiều kết quả phù hợp

#### KHÔNG NÊN ❌
- Bỏ qua bước `resolve-library-id` (trừ khi người dùng cung cấp ID chính xác)
- Đoán hoặc tự tạo library ID
- Sử dụng topic mơ hồ
- Giả định kết quả đầu tiên luôn đúng
- Bỏ qua điểm benchmark và uy tín

### Ví dụ quy trình

#### Ví dụ 1: Tra cứu thư viện cơ bản
```
Người dùng: "Làm thế nào để sử dụng React hooks?"

1. resolve-library-id("react")
2. Chọn: /facebook/react (điểm cao nhất, khớp chính xác)
3. get-library-docs("/facebook/react", topic="hooks")
```

#### Ví dụ 2: Phiên bản cụ thể
```
Người dùng: "Hiển thị tài liệu routing của Next.js 14"

1. resolve-library-id("next.js")
2. Chọn: /vercel/next.js/v14.x.x
3. get-library-docs("/vercel/next.js/v14.x.x", topic="routing")
```

#### Ví dụ 3: Người dùng cung cấp ID chính xác
```
Người dùng: "Lấy tài liệu cho /mongodb/docs"

Bỏ qua resolve-library-id, trực tiếp:
1. get-library-docs("/mongodb/docs")
```

#### Ví dụ 4: Truy vấn mơ hồ
```
Người dùng: "Hiển thị tài liệu cho axios"

1. resolve-library-id("axios")
2. Nếu có nhiều kết quả: Giải thích sự khác biệt và chọn phù hợp nhất
3. get-library-docs(selected_id)
```

### Xử lý lỗi

- **Không tìm thấy kết quả**: Đề xuất cải thiện truy vấn, kiểm tra lỗi chính tả
- **Nhiều kết quả tốt như nhau**: Thừa nhận và giải thích lý do chọn
- **Ngữ cảnh không đủ**: Sử dụng phân trang hoặc thử các topic khác
- **Library ID không hợp lệ**: Chạy lại resolve-library-id với tên đã sửa

---

## Quick Reference / Tham khảo nhanh

### Mandatory Sequence / Trình tự bắt buộc
```
resolve-library-id → get-library-docs
```

### Exception / Ngoại lệ
User provides exact ID format: `/org/project` or `/org/project/version`

### Selection Criteria Priority / Ưu tiên tiêu chí chọn
1. Name similarity / Độ tương đồng tên
2. Benchmark score / Điểm benchmark
3. Documentation coverage / Phạm vi tài liệu
4. Source reputation / Uy tín nguồn
5. Description relevance / Độ liên quan mô tả

### Common Topics / Topic phổ biến
- hooks
- routing
- authentication
- state management
- API
- components
- configuration
- deployment
- testing
- performance
- security

### Trong các folder dạng như /components hay /pages
- Hãy tạo 1 file index.ts để import/export các file Barrel file -> gọn dễ đọc