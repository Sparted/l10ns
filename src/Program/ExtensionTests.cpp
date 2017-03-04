
#include "Types.cpp"
#include "Utils.cpp"
#include "json.hpp"
#include "Diagnostics.cpp"
#include "Extension.cpp"

using namespace L10ns;
using json = nlohmann::json;

void run_extension_tests(Session* session) {
    string extension_file = join_paths(*session->root_dir, "Extension.json");
    auto for_each_compilation_test_file = [&](std::function<void (const string&)> callback) -> void {
        vector<string> comilation_test_files = find_files(*session->root_dir + "Tests/Cases/Compilations/*");
        for (auto const& f : comilation_test_files) {
            callback(f);
        }
    };

    Extension extension = Extension::create(session, extension_file);
    for_each_compilation_test_file([&](const string& test_file) {
        extension.start_server();
    });
}